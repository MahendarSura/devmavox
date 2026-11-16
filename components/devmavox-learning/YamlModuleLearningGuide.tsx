"use client";

import { useEffect, useState } from "react";

type Lesson = {
  title: string;
  objective: string;
  explanation: string;
  importance: string;
  steps: string[];
  example: string;
  mistakes: string[];
  exercise: string;
  expected: string;
};

type Module = {
  introduction: string;
  audience: string;
  lessons: Lesson[];
  workflow: string[];
  production: string;
  question: string;
  options: string[];
  answer: string;
  reason: string;
};

const modules: Record<string, Module> = {
  "Learn YAML": {
    introduction: "YAML is a human-readable data format used to describe application and infrastructure configuration. DevOps engineers use it in Kubernetes manifests, Docker Compose, CI/CD pipelines, Ansible playbooks, Helm values and many automation tools. YAML describes what a system should use; the application or automation tool decides how to process that configuration.",
    audience: "Beginners can start without programming experience. Learn the basic structures first, then read examples and create your own configuration files.",
    lessons: [
      {
        title: "01. YAML fundamentals and syntax",
        objective: "Understand keys, values, mappings, sequences and comments.",
        explanation: "A YAML document is built from keys and values. A mapping connects a key to a value using a colon. A sequence represents an ordered list, normally using a hyphen. A scalar is an individual value such as text, a number or true/false. Comments begin with # and help explain configuration to other engineers. Indentation defines relationships between parent and child values, so spaces must be consistent.",
        importance: "Almost every DevOps YAML file uses these structures. If you understand them, you can read and create configuration for Kubernetes, CI/CD and automation tools.",
        steps: ["Identify each key and its value.", "Find parent and child mappings.", "Identify list items beginning with a hyphen.", "Check indentation and spaces.", "Add comments only where they improve understanding."],
        example: `application:
  name: orders-api
  version: "1.2.0"
  enabled: true
  replicas: 3
  ports:
    - 8080
    - 9090
  # Application environment
  environment: production`,
        mistakes: ["Using tabs instead of spaces.", "Forgetting the space after a colon.", "Indenting child values at the wrong level.", "Writing a list without hyphens.", "Assuming every YAML value is a string."],
        exercise: "Create a YAML document for a student application. Add a name, version, enabled flag, replica count and a list containing three ports.",
        expected: "Your document should contain mappings, scalar values, a boolean and an ordered sequence."
      },
      {
        title: "02. Data types and nested structures",
        objective: "Understand strings, integers, decimals, booleans, null and nested objects.",
        explanation: "YAML supports values such as strings, integers, floating-point numbers, booleans and null. A nested mapping groups related values beneath a parent key. For example, database host, port and database name belong together under database. Quoting a value can prevent it from being interpreted as a different type. YAML type interpretation can depend on the YAML version and parser, so quote ambiguous text values when necessary.",
        importance: "Applications often expect a specific type. A replica count should be numeric, a feature flag should be boolean and a version identifier should generally remain text.",
        steps: ["Identify the value type.", "Group related settings under a parent.", "Use quotation marks for ambiguous text.", "Keep sibling keys aligned.", "Review nested structures before validation."],
        example: `application:
  name: "payment-service"
  version: "2.1.0"
  enabled: true
  replicas: 4
  database:
    host: db.internal
    port: 5432
    name: payments
  monitoring:
    enabled: true
    interval: 30`,
        mistakes: ["Quoting a boolean when a real boolean is required.", "Using a string instead of a number.", "Putting database settings outside the database object.", "Creating duplicate keys.", "Confusing null with the text 'null'."],
        exercise: "Add a cache object with host, port and enabled settings. Keep it at the same level as database and monitoring.",
        expected: "The document should have clearly separated nested objects and appropriate value types."
      },
      {
        title: "03. Advanced YAML structures and reusable configuration",
        objective: "Understand lists of objects, block strings, anchors and aliases.",
        explanation: "YAML sequences can contain complete objects, not just simple strings or numbers. This is common when defining multiple containers, pipeline jobs or environment variables. Block strings using | preserve line breaks, while > folds lines into a more compact paragraph. Anchors and aliases allow repeated values to be reused, but they should be used only when they improve maintainability.",
        importance: "Real configuration files contain lists of resources and repeated settings. Understanding these structures makes large manifests easier to read and maintain.",
        steps: ["Create a list using hyphens.", "Add multiple properties to each list item.", "Use block strings for multiline scripts.", "Understand an anchor and its alias.", "Validate the complete document."],
        example: `services:
  - name: api
    image: nginx:1.27
    ports:
      - 8080
  - name: worker
    image: busybox:1.36
    command:
      - sh
      - -c
      - "echo worker started"

description: |
  This application contains
  an API and a background worker.`,
        mistakes: ["Misaligning list items.", "Putting child properties outside the list item.", "Using anchors unnecessarily.", "Breaking multiline script indentation.", "Forgetting to validate complex documents."],
        exercise: "Add a third service named metrics with an image and a port. Include a multiline description of the application.",
        expected: "You should be able to create lists of objects and multiline text without breaking the YAML hierarchy."
      }
    ],
    workflow: ["Understand mappings and sequences.", "Identify YAML data types.", "Create nested configuration.", "Practice lists and multiline values.", "Validate your document."],
    production: "Use consistent indentation, meaningful keys, clear comments and code review. Avoid duplicate keys and ambiguous values. Do not store passwords or private keys in ordinary YAML files.",
    question: "Which YAML structure represents an ordered collection of items?",
    options: ["Mapping", "Sequence", "Scalar", "Comment"],
    answer: "Sequence",
    reason: "A sequence represents an ordered list. Each item is commonly introduced by a hyphen."
  },

  "YAML Editor": {
    introduction: "The YAML Editor is a practical workspace for writing, modifying, formatting and organizing YAML files. You can begin with an example, change values, add configuration blocks and prepare files for download or review. The editor helps you work with YAML text, but you must still understand what the configuration means to the application that consumes it.",
    audience: "Use this module after learning basic YAML syntax. Beginners can edit sample files; experienced learners can practice environment-specific configuration.",
    lessons: [
      {
        title: "01. Editor workspace and basic editing",
        objective: "Learn how to create, edit, format and save YAML.",
        explanation: "A code editor provides a workspace for writing configuration. Syntax highlighting makes keys, values and comments easier to identify. Line numbers help locate errors. Editing means changing values or adding structures while preserving the hierarchy. Formatting improves readability, while copying and downloading let you reuse the completed document.",
        importance: "DevOps engineers regularly update image tags, replica counts, ports, resource limits and environment settings. A safe editing process prevents accidental configuration damage.",
        steps: ["Open an example YAML document.", "Find the setting you want to change.", "Modify one value at a time.", "Keep indentation consistent.", "Format and validate the document.", "Copy or download your final configuration."],
        example: `application:
  name: catalog-api
  environment: staging
  replicas: 2
  image:
    repository: nginx
    tag: "1.27"`,
        mistakes: ["Changing unrelated settings accidentally.", "Pasting tab-indented configuration.", "Removing a parent key.", "Resetting before copying important work.", "Assuming formatting proves the configuration is correct."],
        exercise: "Change the name to inventory-api, replicas to 3 and image tag to 1.28. Keep all other settings intact.",
        expected: "The edited file should retain its original structure with only the requested values changed."
      },
      {
        title: "02. Editing nested configuration safely",
        objective: "Add and update nested keys and lists without damaging relationships.",
        explanation: "When editing a nested document, first identify the parent key. A child property must remain indented below that parent. When adding an item to a list, align it with the existing items. Some fields depend on other fields: Kubernetes selectors must match labels, and references to ConfigMaps or Secrets must use the correct names.",
        importance: "A document can be syntactically valid but logically incorrect. Safe editing requires understanding how fields relate to one another.",
        steps: ["Identify the parent object.", "Find related fields and references.", "Add the new key at the correct indentation.", "Update dependent values together.", "Review the entire affected section.", "Run validation."],
        example: `service:
  name: inventory-api
  selector:
    app: inventory-api
  ports:
    - name: http
      port: 80
      targetPort: 8080
    - name: metrics
      port: 9090
      targetPort: 9090`,
        mistakes: ["Adding a child at the wrong level.", "Changing a selector without changing matching labels.", "Putting a port outside the list.", "Changing a reference without updating its target."],
        exercise: "Add a second service port called metrics with port 9090 and targetPort 9090.",
        expected: "Both ports should appear as separate objects under the ports sequence."
      },
      {
        title: "03. Maintainable configuration files",
        objective: "Prepare clean configuration for team review and version control.",
        explanation: "A maintainable YAML file uses clear names, consistent formatting and environment-specific values. Avoid unexplained abbreviations and temporary test settings. Pin application image versions so that a deployment is predictable. Keep credentials outside source-controlled configuration and use an approved secret-management system.",
        importance: "Configuration is part of the software delivery process. Clear changes make pull requests easier to review, incidents easier to investigate and rollbacks easier to perform.",
        steps: ["Choose meaningful resource names.", "Remove temporary settings.", "Review image versions.", "Separate environment-specific values.", "Check sensitive information.", "Format and validate before committing."],
        example: `application:
  name: inventory-api
  environment: production
  image:
    repository: registry.example.com/inventory-api
    tag: "2.4.1"
  resources:
    requests:
      cpu: 100m
      memory: 128Mi
    limits:
      cpu: 500m
      memory: 512Mi`,
        mistakes: ["Using uncontrolled image tags.", "Committing credentials.", "Leaving debugging flags enabled.", "Making unexplained production changes."],
        exercise: "Prepare a production configuration with a pinned image version and CPU and memory requests and limits.",
        expected: "The file should be readable, version-specific and free of embedded credentials."
      }
    ],
    workflow: ["Open a working example.", "Edit one logical section.", "Review related fields.", "Format and validate.", "Copy or download the completed YAML."],
    production: "Use version control, pull requests and peer review. Pin images, review resource settings and keep secrets in an approved secret manager. Never rely only on syntax highlighting.",
    question: "What should you review after changing a Kubernetes selector?",
    options: ["Only the file name", "Matching Pod labels", "Only comments", "Editor theme"],
    answer: "Matching Pod labels",
    reason: "Selectors identify matching resources using labels. A mismatch can cause a Service or controller to select no Pods."
  },

  "YAML Validator": {
    introduction: "The YAML Validator helps identify malformed YAML documents. It checks whether the parser can understand the document structure and can report errors such as invalid indentation, missing delimiters, duplicate keys and malformed values. Syntax validation is only one level of quality checking; application-specific schema validation is also necessary.",
    audience: "Use this module whenever you create, modify or review configuration. Learn to read errors and correct the actual cause instead of guessing.",
    lessons: [
      {
        title: "01. YAML parsing and syntax validation",
        objective: "Understand what a parser validates.",
        explanation: "A YAML parser reads the document and converts it into structured data. It checks whether mappings, sequences, scalar values, indentation and delimiters follow YAML syntax. If the structure cannot be parsed, the validator reports an error. A valid result only means the document can be parsed; it does not prove that Kubernetes or another application accepts every field.",
        importance: "Syntax validation catches basic mistakes before a file reaches CI/CD or a deployment environment.",
        steps: ["Load a YAML document.", "Run validation.", "Read the result.", "Inspect reported errors.", "Correct the structure.", "Validate again."],
        example: `application:
  name: inventory-api
  enabled: true
  replicas: 3
  ports:
    - 8080
    - 9090`,
        mistakes: ["Assuming valid syntax means successful deployment.", "Ignoring duplicate keys.", "Changing unrelated values during a syntax fix.", "Ignoring parser warnings."],
        exercise: "Remove a required colon from a copy of the example. Run validation, inspect the error and restore the correct syntax.",
        expected: "You should be able to identify a syntax error and correct it."
      },
      {
        title: "02. Read and troubleshoot line errors",
        objective: "Use line and column information to locate the real mistake.",
        explanation: "A parser may report the line and column where it could no longer understand the document. The original problem can sometimes be on an earlier line, such as an unclosed quotation mark. Inspect the reported line and nearby lines. Compare sibling indentation and verify that all quotes, brackets and braces are correctly closed.",
        importance: "Large YAML files can contain hundreds of lines. Understanding error locations makes troubleshooting faster and reduces random edits.",
        steps: ["Read the first reported error.", "Locate its line and column.", "Inspect the previous line too.", "Check indentation and delimiters.", "Correct one issue.", "Run validation again."],
        example: `service:
  name: inventory-api
  ports:
    - name: http
      port: 80
      targetPort: 8080
  enabled: true`,
        mistakes: ["Assuming the reported line is always the original cause.", "Fixing many unrelated errors together.", "Ignoring an earlier open quote.", "Using tabs in indentation."],
        exercise: "Misalign the targetPort field in a copy of the example. Use the error response to identify and correct its position.",
        expected: "The corrected document should parse with targetPort inside the correct list item."
      },
      {
        title: "03. Syntax validation versus schema validation",
        objective: "Understand why valid YAML can still be rejected by an application.",
        explanation: "Syntax validation checks YAML structure. Schema validation checks whether a document contains fields and values accepted by a particular tool or API. Kubernetes checks API versions, resource kinds, required fields and supported values. Admission policies may apply additional organizational or security rules. A general YAML parser cannot prove that a manifest is accepted by a live cluster.",
        importance: "This distinction prevents false confidence. A misspelled field can still be valid YAML while being incorrect for the application.",
        steps: ["Parse the YAML document.", "Identify its target tool.", "Check the target schema.", "Verify supported API versions.", "Review admission policies.", "Test against the intended environment."],
        example: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: inventory-api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: inventory-api
  template:
    metadata:
      labels:
        app: inventory-api
    spec:
      containers:
        - name: api
          image: nginx:1.27`,
        mistakes: ["Calling parser success a successful deployment.", "Ignoring API compatibility.", "Assuming every field is supported.", "Skipping admission checks."],
        exercise: "Explain three checks you would perform after YAML syntax validation and before applying a Kubernetes manifest.",
        expected: "Your answer should mention schema/API compatibility and environment-specific validation."
      }
    ],
    workflow: ["Parse the YAML.", "Read the first error.", "Correct syntax and indentation.", "Run tool-specific schema validation.", "Review cluster or application acceptance."],
    production: "Run syntax and schema validation in pull requests. Validate Kubernetes manifests against the target API version and policy requirements. Monitor actual rollout health after applying changes.",
    question: "Does valid YAML syntax guarantee Kubernetes accepts a manifest?",
    options: ["Yes, always", "No, schema and cluster validation are also needed", "Only for short files", "Only when comments exist"],
    answer: "No, schema and cluster validation are also needed",
    reason: "A parser checks syntax. Kubernetes also checks API versions, schemas, resource requirements and applicable admission rules."
  },

  "Kubernetes Manifest Lab": {
    introduction: "Kubernetes manifests describe the desired state of resources in a cluster. A Deployment manages application Pods, a Service provides a stable network endpoint, a ConfigMap stores ordinary configuration and a Secret is designed for sensitive values. Kubernetes controllers continuously work to move actual cluster state toward the declared desired state.",
    audience: "Use this lab to learn how YAML becomes real Kubernetes resources. Start with workloads, then networking and application configuration.",
    lessons: [
      {
        title: "01. Pods, Deployments and ReplicaSets",
        objective: "Understand how Kubernetes runs and maintains application containers.",
        explanation: "A Pod is the smallest deployable Kubernetes unit and can contain one or more containers. A Deployment manages stateless application replicas using a ReplicaSet. The replicas field describes the desired number of Pods. The selector identifies the Pods managed by the Deployment, while the Pod template describes the labels and container configuration for new Pods. The selector must match the template labels.",
        importance: "Deployments provide replica management, controlled updates and rollback history for common web applications and APIs.",
        steps: ["Choose the correct apiVersion and kind.", "Set metadata.name and namespace.", "Define the replica count.", "Match selector labels with template labels.", "Configure container image and ports.", "Add resources and health probes."],
        example: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: orders-api
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: orders-api
  template:
    metadata:
      labels:
        app: orders-api
    spec:
      containers:
        - name: api
          image: nginx:1.27
          ports:
            - containerPort: 80`,
        mistakes: ["Mismatched selector and Pod labels.", "Using an incorrect API version.", "Ignoring container resource requirements.", "Assuming containerPort exposes a public endpoint."],
        exercise: "Create a Deployment named catalog-api with three replicas and matching app: catalog-api selector and template labels.",
        expected: "The Deployment should describe three Pods that match its selector."
      },
      {
        title: "02. Services, Ingress and networking",
        objective: "Connect application Pods to other workloads and external traffic.",
        explanation: "A Service provides a stable endpoint for a group of Pods. Its selector identifies the target Pods. The Service port is the port clients use, while targetPort is the port on the selected Pods. ClusterIP is normally used for internal access. NodePort and LoadBalancer provide other exposure options. Ingress defines HTTP and HTTPS routing through an Ingress controller. NetworkPolicy can restrict Pod traffic when supported by the cluster networking implementation.",
        importance: "Applications need reliable communication. Correct selectors, ports and routing rules help services reach the intended workloads.",
        steps: ["Identify the application Pod labels.", "Create a Service selector using matching labels.", "Choose the correct Service type.", "Set port and targetPort.", "Configure ingress routing if required.", "Verify endpoints and connectivity."],
        example: `apiVersion: v1
kind: Service
metadata:
  name: catalog-api
spec:
  type: ClusterIP
  selector:
    app: catalog-api
  ports:
    - name: http
      port: 80
      targetPort: 8080`,
        mistakes: ["Selector does not match Pod labels.", "Confusing port and targetPort.", "Expecting a Service to change the application listening port.", "Creating Ingress without an Ingress controller."],
        exercise: "Create a ClusterIP Service for an application labelled app: catalog-api. Expose port 80 and forward to port 8080.",
        expected: "The Service should select the intended Pods and map client traffic to the application port."
      },
      {
        title: "03. ConfigMaps, Secrets and persistent storage",
        objective: "Manage configuration, credentials and application data.",
        explanation: "A ConfigMap stores non-sensitive settings such as log levels and feature flags. A Secret is designed for sensitive values, but Base64 encoding alone is not encryption. Protect Secrets using encryption at rest, RBAC and appropriate secret-management controls. PersistentVolume and PersistentVolumeClaim resources provide storage that can outlive an individual Pod. StorageClass can describe dynamic provisioning behavior.",
        importance: "Applications need external configuration and sometimes persistent data. Separating these concerns helps deployments remain reusable and secure.",
        steps: ["Separate ordinary settings from credentials.", "Create a ConfigMap for non-sensitive values.", "Use a protected Secret or external secret manager.", "Reference configuration from the Pod.", "Identify persistent storage requirements.", "Verify access permissions and mount paths."],
        example: `apiVersion: v1
kind: ConfigMap
metadata:
  name: catalog-config
data:
  APP_ENV: production
  LOG_LEVEL: info
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: catalog-data
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi`,
        mistakes: ["Putting passwords in ConfigMaps.", "Assuming Base64 is encryption.", "Giving broad Secret access.", "Ignoring storage access modes and capacity.", "Deleting storage without reviewing reclaim behavior."],
        exercise: "Create a ConfigMap with APP_ENV and LOG_LEVEL and a PVC requesting 5Gi. Explain why a database password should not be stored in the ConfigMap.",
        expected: "You should separate ordinary configuration from storage and sensitive credential management."
      }
    ],
    workflow: ["Identify the resource and API version.", "Define metadata and namespace.", "Write the resource specification.", "Check labels, selectors and references.", "Validate manifests.", "Apply through an approved deployment process."],
    production: "Use resource requests and limits, health probes, least-privilege RBAC, protected secrets, reviewed storage settings and controlled rollouts. Validate manifests against the target cluster version.",
    question: "Which Deployment fields must match to identify the managed Pods?",
    options: ["metadata.name and image", "selector.matchLabels and template.metadata.labels", "Service port and namespace", "Container name and apiVersion"],
    answer: "selector.matchLabels and template.metadata.labels",
    reason: "The Deployment selector must match the labels on the Pods created from its template."
  },

  "Troubleshooting Lab": {
    introduction: "Troubleshooting means finding the real cause of a failure using evidence. Do not change random YAML values when an application fails. Identify the symptom, collect logs and events, compare desired and live configuration, form a root-cause hypothesis, test safely and verify recovery.",
    audience: "Learn to investigate configuration and Kubernetes problems using an evidence-first approach.",
    lessons: [
      {
        title: "01. YAML indentation and parsing errors",
        objective: "Find malformed YAML structures and correct them.",
        explanation: "A YAML parser can fail when a child value is placed at the wrong indentation, a colon is missing, a quote is not closed or a list is malformed. The reported line is where the parser detected a problem, but the original mistake may be earlier. Inspect surrounding lines and compare the structure with nearby valid mappings or sequences.",
        importance: "Malformed configuration can stop a pipeline or deployment before resources are created.",
        steps: ["Run the YAML validator.", "Read the first error.", "Inspect the reported line and previous line.", "Check indentation and delimiters.", "Correct the smallest affected section.", "Validate again."],
        example: `application:
  name: orders-api
  database:
    host: db.internal
    port: 5432
  logging:
    level: info`,
        mistakes: ["Adding spaces randomly.", "Ignoring an earlier open quote.", "Fixing several unrelated lines at once.", "Using tabs."],
        exercise: "Misalign the database port in a copy of the example. Observe the validator response and restore the correct indentation.",
        expected: "The corrected document should parse and keep host and port under database."
      },
      {
        title: "02. Pod CrashLoopBackOff",
        objective: "Investigate a container that repeatedly starts and exits.",
        explanation: "CrashLoopBackOff is a restart behavior, not a root cause. The application may exit because of a bad command, missing configuration, failed dependency connection or startup error. An incorrectly configured liveness probe can also terminate a container. Inspect Pod events, current and previous logs, environment references, volumes and probe configuration before changing the manifest.",
        importance: "Repeated restarts waste resources and can hide important evidence. Logs and events help identify the actual startup failure.",
        steps: ["Identify the Pod and namespace.", "Describe the Pod and inspect events.", "Read current and previous container logs.", "Check command, arguments and configuration references.", "Review startup and liveness probes.", "Apply a targeted fix and verify readiness."],
        example: `apiVersion: v1
kind: Pod
metadata:
  name: orders-api
spec:
  containers:
    - name: api
      image: nginx:1.27
      startupProbe:
        httpGet:
          path: /
          port: 80
        periodSeconds: 5
        failureThreshold: 30
      livenessProbe:
        httpGet:
          path: /
          port: 80
        periodSeconds: 10
        failureThreshold: 3`,
        mistakes: ["Treating CrashLoopBackOff as the cause.", "Deleting Pods before collecting logs.", "Increasing probe delays without evidence.", "Ignoring missing configuration references."],
        exercise: "Write an incident investigation checklist for a Pod that enters CrashLoopBackOff. Include logs, events, configuration and probes.",
        expected: "Your checklist should collect evidence before changing or restarting the workload."
      },
      {
        title: "03. Service connectivity and missing endpoints",
        objective: "Investigate a Service that does not route traffic.",
        explanation: "A Service can exist but have no usable endpoints. Common causes include selectors that do not match Pod labels, Pods that are not Ready, incorrect targetPort values or application processes listening on different ports. NetworkPolicy and other networking controls can also block traffic. Compare the selector with actual labels, inspect endpoints and verify the listening port.",
        importance: "A Service networking issue can appear like an application outage. Endpoint checks help separate service discovery from application failures.",
        steps: ["Inspect the Service selector.", "Compare it with actual Pod labels.", "Check Pod readiness.", "Inspect endpoints or EndpointSlices.", "Verify the targetPort and application listening port.", "Review network policies if endpoints exist but traffic still fails."],
        example: `apiVersion: v1
kind: Service
metadata:
  name: payments
spec:
  selector:
    app: payments-api
  ports:
    - port: 80
      targetPort: 8080
---
apiVersion: v1
kind: Pod
metadata:
  name: payments-api
  labels:
    app: payments-api
spec:
  containers:
    - name: api
      image: nginx:1.27`,
        mistakes: ["Checking only whether the Service exists.", "Ignoring Pod readiness.", "Assuming containerPort configures the application.", "Changing network rules before checking selectors."],
        exercise: "Change the Service selector to a label that does not match the Pod. Explain the effect, then restore the matching selector.",
        expected: "You should understand why mismatched selectors produce no selected Pods."
      }
    ],
    workflow: ["Describe the symptom and impact.", "Collect logs, events and resource configuration.", "Compare desired and live state.", "Form a root-cause hypothesis.", "Apply the smallest safe correction.", "Verify recovery and record prevention."],
    production: "Preserve logs and events before restarting or deleting resources. Record changes, communicate impact and verify recovery using application health and user-facing checks.",
    question: "What is a good first step when a Pod enters CrashLoopBackOff?",
    options: ["Delete every Pod", "Collect events and current/previous logs", "Increase replicas immediately", "Disable every probe"],
    answer: "Collect events and current/previous logs",
    reason: "Evidence helps identify the actual failure before applying a potentially harmful change."
  },

  "CI/CD and GitOps Lab": {
    introduction: "CI/CD automates software validation, building and delivery. YAML files define workflows, jobs, runners and steps. Helm packages Kubernetes applications and uses values files for environment-specific settings. GitOps uses Git as the source of desired configuration and a controller such as Argo CD to reconcile live resources.",
    audience: "Use this module to understand how a configuration change moves from a developer commit to a tested artifact and a Kubernetes deployment.",
    lessons: [
      {
        title: "01. CI pipeline structure",
        objective: "Understand workflow triggers, jobs, runners and steps.",
        explanation: "A CI workflow describes automated work triggered by repository events. A workflow has a name, triggers and jobs. Each job runs on a runner and contains ordered steps. Steps can check out source code, validate YAML, run tests, build artifacts and publish results. Protected secrets should be used for credentials instead of hardcoding them in workflow files.",
        importance: "Automated checks detect errors before a change reaches production and create a repeatable process for every pull request.",
        steps: ["Identify the workflow trigger.", "Read the job names.", "Check the runner environment.", "Review each step in execution order.", "Add validation and tests.", "Protect credentials and deployment permissions."],
        example: `name: application-ci
on:
  push:
    branches:
      - main
  pull_request:
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout source
        uses: actions/checkout@v4
      - name: Validate YAML
        run: echo "Run YAML validation"
      - name: Run tests
        run: echo "Run application tests"`,
        mistakes: ["Putting a step outside its job.", "Using an unavailable runner.", "Printing credentials in logs.", "Deploying before required tests pass."],
        exercise: "Add a build step after the test step. Give it a clear name and a command representing your application build.",
        expected: "Your workflow should contain a trigger, a job, a runner and ordered steps."
      },
      {
        title: "02. Helm charts and values",
        objective: "Understand templates, values and environment overrides.",
        explanation: "A Helm chart packages Kubernetes resource templates. The values file supplies configurable settings such as replica count, image repository, image tag, service type and resource limits. Different values files can customize the same chart for development, staging and production. A value only affects a resource when the chart template references it. Rendered manifests should be reviewed before deployment.",
        importance: "Helm avoids copying complete manifests for every environment and makes application configuration reusable.",
        steps: ["Inspect the chart structure.", "Read its default values.", "Override required environment settings.", "Render the templates.", "Review the generated resources.", "Validate before upgrading."],
        example: `replicaCount: 3
image:
  repository: registry.example.com/orders-api
  tag: "2.4.1"
  pullPolicy: IfNotPresent
service:
  type: ClusterIP
  port: 80
resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 500m
    memory: 512Mi`,
        mistakes: ["Assuming every values key is used by the chart.", "Using unpinned image tags.", "Ignoring rendered manifests.", "Committing plaintext credentials."],
        exercise: "Create production values for three replicas with a pinned image version and CPU and memory requests and limits.",
        expected: "The values should be environment-specific and ready for chart rendering and review."
      },
      {
        title: "03. Argo CD and GitOps reconciliation",
        objective: "Understand desired state, synchronization and drift.",
        explanation: "In GitOps, Git stores the desired configuration. Argo CD compares the repository state with live Kubernetes resources. Sync applies the desired configuration. OutOfSync means the live resources differ from the desired source. Automated sync can apply changes automatically, self-heal can correct live drift and pruning can remove resources no longer declared in Git. These options must be reviewed carefully before enabling them for production.",
        importance: "GitOps provides traceable configuration changes and repeatable deployments. It also helps teams investigate why live resources differ from reviewed configuration.",
        steps: ["Identify the source repository and path.", "Check the target cluster and namespace.", "Review the desired Git revision.", "Inspect sync and health status.", "Review pruning and self-heal behavior.", "Verify the live application after synchronization."],
        example: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: orders-production
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/example/platform-config.git
    targetRevision: main
    path: apps/orders/production
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: false
      selfHeal: true`,
        mistakes: ["Confusing pipeline success with deployment health.", "Enabling pruning without reviewing deletion impact.", "Changing live resources without updating Git.", "Ignoring repository path or target namespace."],
        exercise: "Describe how you would investigate an Argo CD application showing OutOfSync. Include the Git revision and live differences.",
        expected: "Your investigation should compare the desired source with actual resources before deciding to synchronize."
      }
    ],
    workflow: ["Commit a reviewed configuration change.", "Run pipeline validation and tests.", "Build a versioned artifact.", "Update deployment configuration in Git.", "Allow GitOps reconciliation.", "Monitor deployment health."],
    production: "Use protected branches, peer approvals, scoped credentials, pinned actions and image versions, artifact traceability and deployment gates. Review Helm output and Argo CD pruning behavior before production synchronization.",
    question: "What is the source of desired configuration in a GitOps workflow?",
    options: ["A manually edited Pod", "The reviewed Git repository", "Terminal history", "Container logs"],
    answer: "The reviewed Git repository",
    reason: "Git stores the desired state that the GitOps controller uses for reconciliation."
  },

  "Production Scenarios": {
    introduction: "Production YAML changes affect applications and users. A safe change requires understanding impact, dependencies, rollout behavior, monitoring and rollback. This module uses realistic operational situations to teach planning, evidence collection and controlled recovery.",
    audience: "Use these lessons after understanding YAML, Kubernetes and CI/CD fundamentals. Think like an engineer responsible for application availability.",
    lessons: [
      {
        title: "01. Zero-downtime deployment rollout",
        objective: "Plan an application update while reducing service interruption.",
        explanation: "A Deployment rolling update gradually replaces old Pods with new ones. maxSurge controls additional Pods that can be created, while maxUnavailable controls how many desired Pods can be unavailable during the rollout. Readiness probes help Kubernetes decide whether new Pods can receive traffic. Adequate capacity and a tested rollback path are also important. Manifest acceptance alone does not prove that an application update is healthy.",
        importance: "Production applications often need updates without planned downtime. Controlled rollout reduces the risk of replacing every healthy instance at once.",
        steps: ["Check current version and healthy replicas.", "Review new image and update strategy.", "Confirm readiness probes and capacity.", "Validate and approve the change.", "Monitor rollout and application health.", "Rollback if agreed health checks fail."],
        example: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: checkout-api
  namespace: production
spec:
  replicas: 4
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: checkout-api
  template:
    metadata:
      labels:
        app: checkout-api
    spec:
      containers:
        - name: api
          image: registry.example.com/checkout-api:2.4.1
          ports:
            - containerPort: 8080
          readinessProbe:
            httpGet:
              path: /health/ready
              port: 8080`,
        mistakes: ["Updating without monitoring rollout status.", "Using an incorrect readiness endpoint.", "Ignoring cluster capacity.", "Having no rollback criteria."],
        exercise: "Plan a rollout with four replicas, maxSurge 1 and maxUnavailable 0. Write down the health signals you would monitor.",
        expected: "Your plan should include readiness, rollout health, user impact and rollback criteria."
      },
      {
        title: "02. Production credential rotation",
        objective: "Replace a credential without exposing it or causing avoidable downtime.",
        explanation: "Credential rotation replaces an old password, token or key with a new one. Identify every application that uses the credential. Generate the replacement through an approved secret manager. Update the protected reference and coordinate application reload behavior. Verify that all consumers authenticate with the new credential before revoking the old one. Do not put real credentials in source control or incident messages.",
        importance: "Credentials need rotation for security policy, personnel changes or suspected exposure. An incomplete rotation can break application authentication.",
        steps: ["Identify all credential consumers.", "Generate a replacement securely.", "Update the protected Secret reference.", "Plan application reload or restart.", "Verify successful authentication.", "Revoke the old credential after verification."],
        example: `apiVersion: v1
kind: Secret
metadata:
  name: checkout-db-credentials
  namespace: production
type: Opaque
stringData:
  username: checkout_app
  password: REPLACE_WITH_SECRET_MANAGER_VALUE`,
        mistakes: ["Committing real credentials.", "Revoking the old credential too early.", "Forgetting background workers.", "Assuming environment variables update automatically in running processes."],
        exercise: "Create a rotation plan for a database credential. List consumers, update order, verification and revocation steps. Use placeholders only.",
        expected: "The plan should protect the credential and verify all consumers before the old credential is revoked."
      },
      {
        title: "03. GitOps drift and production recovery",
        objective: "Investigate differences between Git and live resources.",
        explanation: "Configuration drift occurs when live resources differ from the desired state in Git. It may result from manual edits, emergency changes or controllers. Do not immediately overwrite the live state. First determine whether the difference is intentional, who approved it and what impact reconciliation may have. Update Git if the change is legitimate, or plan controlled reconciliation if the difference is accidental.",
        importance: "Blind synchronization can remove an emergency correction or overwrite an important production change. Investigation and change ownership are essential.",
        steps: ["Identify affected application and resource.", "Compare Git manifests with live state.", "Review recent commits and change records.", "Determine whether the difference is intentional.", "Choose an approved source of truth.", "Synchronize safely and verify health."],
        example: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: checkout-production
  namespace: argocd
spec:
  source:
    repoURL: https://github.com/example/platform-config.git
    targetRevision: main
    path: apps/checkout/production
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: false
      selfHeal: false`,
        mistakes: ["Assuming every live difference is accidental.", "Synchronizing without reviewing impact.", "Enabling pruning without checking deletion risk.", "Fixing live state without updating Git."],
        exercise: "A production replica count differs from Git. Explain how you would identify whether it is an approved emergency change or accidental drift.",
        expected: "Your response should include evidence, ownership, desired state and a safe reconciliation decision."
      }
    ],
    workflow: ["Understand business and technical impact.", "Collect current state and change history.", "Review dependencies.", "Validate and approve the change.", "Apply and monitor.", "Verify success or rollback."],
    production: "Use change records, peer approval, versioned artifacts, protected credentials, staged rollout and documented rollback. Define measurable success criteria before making the change.",
    question: "When should an old production credential normally be revoked?",
    options: ["Before creating the replacement", "After consumers use and verify the replacement", "Before identifying consumers", "Immediately after editing YAML"],
    answer: "After consumers use and verify the replacement",
    reason: "Verification confirms that applications can authenticate with the replacement before the old credential is removed."
  },

  "Quiz and Assessment": {
    introduction: "This module checks whether you can explain YAML concepts and apply them to real DevOps configuration. A good assessment tests more than memory: you should read manifests, identify incorrect relationships, explain validation results and choose safe operational actions.",
    audience: "Use this module after studying the other workspaces. Beginners can focus on YAML structures; advanced learners should explain why an answer is correct and what could go wrong with other choices.",
    lessons: [
      {
        title: "01. YAML concept assessment",
        objective: "Check your understanding of basic YAML structures.",
        explanation: "Concept questions test mappings, sequences, scalar types, indentation and nested objects. A sequence is an ordered collection. A mapping connects keys and values. A scalar is an individual value. Understanding the purpose of each structure is more useful than memorizing terminology.",
        importance: "Strong fundamentals help you understand unfamiliar configuration and identify structural problems.",
        steps: ["Read the question.", "Identify the concept being tested.", "Compare all answer choices.", "Explain the selected answer.", "Review why alternatives are incorrect."],
        example: `# Mapping
application:
  name: orders-api

# Sequence
ports:
  - 8080
  - 9090

# Scalar values
enabled: true
replicas: 3`,
        mistakes: ["Choosing a familiar keyword without reading the question.", "Confusing a mapping with a sequence.", "Ignoring value types.", "Skipping answer explanations."],
        exercise: "Explain the difference between a mapping and a sequence and give one DevOps example of each.",
        expected: "You should be able to explain each structure in simple words."
      },
      {
        title: "02. Kubernetes manifest review",
        objective: "Identify configuration relationships and common mistakes.",
        explanation: "Practical assessment asks you to inspect manifests. A Deployment selector must match Pod template labels. A Service selector must match the Pods that receive traffic. Image names, ports, configuration references and resource settings should also be reviewed. A good answer explains the relationship and operational impact of an incorrect value.",
        importance: "Engineers review configuration written by other people. Identifying risks before deployment is an important production skill.",
        steps: ["Identify resource kind.", "Read required fields.", "Compare labels and selectors.", "Review ports and image references.", "Check configuration dependencies.", "Explain possible consequences."],
        example: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: report-api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: report-api
  template:
    metadata:
      labels:
        app: report-api
    spec:
      containers:
        - name: api
          image: nginx:1.27`,
        mistakes: ["Checking only parser success.", "Ignoring selectors.", "Assuming images are available.", "Failing to explain operational impact."],
        exercise: "Change the template label to report-worker. Explain why the Deployment selector no longer matches the Pod template.",
        expected: "You should identify the mismatch and understand why it prevents the intended Pod selection."
      },
      {
        title: "03. Incident and scenario assessment",
        objective: "Choose safe actions during production failures.",
        explanation: "Scenario questions describe an operational situation. You may need to investigate a failing Pod, rotate a credential, correct configuration drift or validate a rollout. Strong answers start with evidence, assess impact, choose the smallest safe action and define how recovery will be verified.",
        importance: "Production engineering requires judgment. A technically valid command may still be wrong if it destroys evidence or increases risk.",
        steps: ["Identify the symptom and affected users.", "Collect logs and events.", "Compare desired and live configuration.", "Determine the likely cause.", "Choose a low-risk correction.", "Verify recovery and prevention."],
        example: `incident:
  service: report-api
  symptom: "Requests return errors"
  observed:
    podsReady: 2
    serviceEndpoints: 0
  investigation:
    - compareServiceSelector
    - inspectPodLabels
    - verifyReadiness
  recovery:
    verify: "Confirm endpoints and successful requests"`,
        mistakes: ["Changing multiple values without evidence.", "Deleting resources before collecting logs.", "Treating a symptom as the root cause.", "Declaring recovery without testing requests."],
        exercise: "A Service exists and two Pods are Ready, but the Service has no endpoints. Explain the evidence you would collect and the first relationship you would inspect.",
        expected: "Your answer should include Service selectors, Pod labels, readiness and endpoint verification."
      }
    ],
    workflow: ["Study the relevant lesson.", "Answer without looking at the explanation.", "Explain why the answer is correct.", "Review mistakes.", "Repeat practical tasks independently."],
    production: "Use assessments to identify learning gaps, not as the only proof of operational readiness. Learners should also edit, validate, explain and troubleshoot real configuration.",
    question: "What is the best first step when investigating an unfamiliar production failure?",
    options: ["Delete affected resources", "Collect evidence and understand impact", "Disable all health checks", "Change several values together"],
    answer: "Collect evidence and understand impact",
    reason: "Evidence and impact assessment help identify the cause and avoid unnecessary or harmful changes."
  }
};

export default function YamlModuleLearningGuide({
  moduleName,
  onLoadExample
}: {
  moduleName: string;
  onLoadExample: (yaml: string) => void;
}) {
  const guide = modules[moduleName];
  const storagePrefix = "devmavox-yaml-learning-progress-v1:";
  const [lessonIndex, setLessonIndex] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, string>>({});
  const [showExpected, setShowExpected] = useState(false);
  const [loadedModule, setLoadedModule] = useState("");
  const [progressSummary, setProgressSummary] = useState<Record<string, {
    completedLessons: number;
    workflowDone: number;
    lessonCount: number;
    workflowCount: number;
  }>>({});

  const practiceAnswer = practiceAnswers[lessonIndex] || "";

  // Restore saved progress for the selected module.
  useEffect(() => {
    setLoadedModule("");

    try {
      const raw = localStorage.getItem(storagePrefix + moduleName);
      const saved = raw ? JSON.parse(raw) : null;

      const moduleGuide = modules[moduleName];
      const restoredLessonIndex =
        Number.isInteger(saved?.lessonIndex) &&
        saved.lessonIndex >= 0 &&
        saved.lessonIndex < moduleGuide.lessons.length
          ? saved.lessonIndex
          : 0;

      setLessonIndex(restoredLessonIndex);
      const restoredCompleted = Array.isArray(saved?.completed)
        ? [...new Set<number>(
            saved.completed.filter((value: unknown): value is number =>
              typeof value === "number" &&
              Number.isInteger(value) &&
              (
                (value >= 0 && value < moduleGuide.lessons.length) ||
                (value >= 100 && value < 100 + moduleGuide.workflow.length)
              )
            )
          )]
        : [];

      setCompleted(restoredCompleted);
      const restoredPracticeAnswers: Record<number, string> = {};

      if (
        saved?.practiceAnswers &&
        typeof saved.practiceAnswers === "object" &&
        !Array.isArray(saved.practiceAnswers)
      ) {
        Object.entries(saved.practiceAnswers).forEach(([key, value]) => {
          const index = Number(key);

          if (
            Number.isInteger(index) &&
            index >= 0 &&
            index < moduleGuide.lessons.length &&
            typeof value === "string"
          ) {
            restoredPracticeAnswers[index] = value;
          }
        });
      }

      setPracticeAnswers(restoredPracticeAnswers);
      setAnswer(typeof saved?.answer === "string" ? saved.answer : "");
      setChecked(Boolean(saved?.checked));
      setShowExpected(false);
    } catch {
      setLessonIndex(0);
      setCompleted([]);
      setPracticeAnswers({});
      setAnswer("");
      setChecked(false);
      setShowExpected(false);
    }

    setLoadedModule(moduleName);
  }, [moduleName]);

  // Load the saved progress overview for all eight modules.
  useEffect(() => {
    const summary: Record<string, {
      completedLessons: number;
      workflowDone: number;
      lessonCount: number;
      workflowCount: number;
    }> = {};

    try {
      Object.keys(modules).forEach((name) => {
        const raw = localStorage.getItem(storagePrefix + name);
        const saved = raw ? JSON.parse(raw) : {};
        const moduleGuide = modules[name];

        summary[name] = {
          completedLessons: Array.isArray(saved.completed)
            ? saved.completed.filter((value: number) => value >= 0 && value < moduleGuide.lessons.length).length
            : 0,
          workflowDone: Array.isArray(saved.completed)
            ? saved.completed.filter((value: number) => Number.isInteger(value) && value >= 100 && value < 100 + moduleGuide.workflow.length).length
            : 0,
          lessonCount: moduleGuide.lessons.length,
          workflowCount: moduleGuide.workflow.length
        };
      });
    } catch {
      // Keep the dashboard available even if one saved entry is damaged.
    }

    setProgressSummary(summary);
  }, []);

  // Save only after the selected module has finished restoring.
  useEffect(() => {
    if (loadedModule !== moduleName || !guide) return;

    const saved = {
      lessonIndex,
      completed,
      practiceAnswers,
      answer,
      checked
    };

    try {
      localStorage.setItem(storagePrefix + moduleName, JSON.stringify(saved));

      setProgressSummary((old) => ({
        ...old,
        [moduleName]: {
          completedLessons: completed.filter(
            (value) => value >= 0 && value < guide.lessons.length
          ).length,
          workflowDone: completed.filter((value) => Number.isInteger(value) && value >= 100 && value < 100 + guide.workflow.length).length,
          lessonCount: guide.lessons.length,
          workflowCount: guide.workflow.length
        }
      }));
    } catch {
      // Storage may be unavailable or full; learning remains usable.
    }
  }, [
    loadedModule,
    moduleName,
    guide,
    lessonIndex,
    completed,
    practiceAnswers,
    answer,
    checked
  ]);

  if (!guide) return null;

  const lesson = guide.lessons[lessonIndex];
  const progress = Math.round((completed.filter((value) => Number.isInteger(value) && value >= 100 && value < 100 + guide.workflow.length).length / guide.workflow.length) * 100);

  return (
    <section className="space-y-5" data-yaml-module-guide={moduleName}>
      <article className="rounded-2xl border border-cyan-900/70 bg-gradient-to-br from-[#10263b] to-[#0d1523] p-5 sm:p-7">
        <div className="text-xs font-bold uppercase tracking-widest text-cyan-300">COMPLETE LEARNING WORKSPACE</div>
        <h2 className="mt-3 text-2xl font-bold text-white">{moduleName}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">{guide.introduction}</p>
        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950/40 p-4">
          <h3 className="font-bold text-cyan-300">Who should learn this?</h3>
          <p className="mt-2 text-sm leading-7 text-slate-300">{guide.audience}</p>
        </div>
      </article>

      <article className="rounded-2xl border border-cyan-900/60 bg-[#0d1523] p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white">Your Learning Progress</h3>
            <p className="mt-1 text-sm text-slate-400">Progress is saved automatically in this browser.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (!window.confirm(`Reset all saved progress for ${moduleName}? This cannot be undone.`)) return;
              try {
                localStorage.removeItem(storagePrefix + moduleName);
              } catch {}
              setLessonIndex(0);
              setCompleted([]);
              setPracticeAnswers({});
              setAnswer("");
              setChecked(false);
              setShowExpected(false);
              setProgressSummary((old) => ({
                ...old,
                [moduleName]: {
                  completedLessons: 0,
                  workflowDone: 0,
                  lessonCount: guide.lessons.length,
                  workflowCount: guide.workflow.length
                }
              }));
            }}
            className="rounded-lg border border-rose-800 bg-rose-950/30 px-3 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-950/60"
          >
            Reset this module
          </button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {Object.keys(modules).map((name) => {
            const item = progressSummary[name];
            const lessonTotal = item?.lessonCount || modules[name].lessons.length;
            const workflowTotal = item?.workflowCount || modules[name].workflow.length;
            const lessonDone = item?.completedLessons || 0;
            const workflowDone = item?.workflowDone || 0;
            const percent = Math.round(
              ((lessonDone + workflowDone) / Math.max(1, lessonTotal + workflowTotal)) * 100
            );

            return (
              <div key={name} className={`rounded-xl border p-3 ${
                name === moduleName
                  ? "border-cyan-700 bg-cyan-950/20"
                  : "border-slate-800 bg-slate-900/60"
              }`}>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold leading-5 text-slate-200">{name}</span>
                  <span className="text-xs font-bold tabular-nums text-cyan-300">{percent}%</span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-cyan-500 transition-all" style={{ width: `${percent}%` }} />
                </div>
                <p className="mt-2 text-[11px] text-slate-500">
                  {lessonDone}/{lessonTotal} lessons · {workflowDone}/{workflowTotal} activities
                </p>
              </div>
            );
          })}
        </div>
      </article>
      <article className="rounded-2xl border border-slate-800 bg-[#0d1523] p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-white">Module lessons</h3>
          <span className="rounded-full border border-cyan-900 bg-cyan-950/40 px-3 py-1 text-xs text-cyan-300">
            {guide.lessons.length} detailed lessons
          </span>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {guide.lessons.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => {
                setLessonIndex(index);
                setShowExpected(false);
              }}
              className={`rounded-xl border p-3 text-left text-sm ${
                lessonIndex === index
                  ? "border-cyan-600 bg-cyan-950/40 text-cyan-200"
                  : "border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500"
              }`}
            >
              <span className="block text-xs text-slate-500">LESSON {index + 1}</span>
              <span className="mt-2 block font-semibold">{item.title}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 border-t border-slate-800 pt-5">
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-300">LEARNING OBJECTIVE</div>
          <h4 className="mt-2 text-xl font-bold text-white">{lesson.title}</h4>
          <p className="mt-2 text-sm leading-7 text-slate-300">{lesson.objective}</p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h5 className="font-bold text-white">Concept explained simply</h5>
              <p className="mt-2 text-sm leading-7 text-slate-300">{lesson.explanation}</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h5 className="font-bold text-white">Why this is important</h5>
              <p className="mt-2 text-sm leading-7 text-slate-300">{lesson.importance}</p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-slate-800 p-4">
            <h5 className="font-bold text-white">Step-by-step learning</h5>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-300">
              {lesson.steps.map((step) => <li key={step}>{step}</li>)}
            </ol>
          </div>

          <div className="mt-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h5 className="font-bold text-white">Practical YAML example</h5>
              <button
                type="button"
                onClick={() => onLoadExample(lesson.example)}
                className="rounded-lg bg-cyan-500 px-3 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400"
              >
                Open in YAML Editor →
              </button>
            </div>
            <pre className="mt-3 overflow-x-auto rounded-xl border border-slate-800 bg-[#070c14] p-4 text-xs leading-6 text-emerald-300">
              {lesson.example}
            </pre>
            <p className="mt-2 text-xs text-slate-500">
              Review and validate examples for the target tool before using them in a real environment.
            </p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-amber-900/70 bg-amber-950/20 p-4">
              <h5 className="font-bold text-amber-300">Common mistakes</h5>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
                {lesson.mistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}
              </ul>
            </div>
            <div className="rounded-xl border border-emerald-900/70 bg-emerald-950/20 p-4">
              <h5 className="font-bold text-emerald-300">Hands-on exercise</h5>
              <p className="mt-3 text-sm leading-7 text-slate-300">{lesson.exercise}</p>

              <label className="mt-4 block text-xs font-semibold text-slate-300">
                YOUR PRACTICE ANSWER
              </label>
              <textarea
                value={practiceAnswer}
                onChange={(event) => {
                  setPracticeAnswers((old) => ({ ...old, [lessonIndex]: event.target.value }));
                  setShowExpected(false);
                }}
                rows={5}
                placeholder="Write your YAML configuration, troubleshooting steps or explanation here..."
                className="mt-2 w-full rounded-xl border border-slate-700 bg-[#070c14] p-3 text-sm leading-6 text-slate-200 outline-none placeholder:text-slate-600 focus:border-cyan-600"
              />

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={!practiceAnswer.trim()}
                  onClick={() => setShowExpected(true)}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Review expected result
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPracticeAnswers((old) => {
                      const next = { ...old };
                      delete next[lessonIndex];
                      return next;
                    });
                    setShowExpected(false);
                  }}
                  className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs text-slate-300"
                >
                  Clear practice
                </button>
              </div>

              {showExpected && (
                <div className="mt-4 rounded-lg border border-emerald-800 bg-emerald-950/20 p-3">
                  <div className="text-xs font-bold text-emerald-300">EXPECTED RESULT</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{lesson.expected}</p>
                  <p className="mt-2 text-xs text-slate-400">
                    Compare your answer with this result and improve your solution.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCompleted((old) => old.includes(lessonIndex) ? old : [...old, lessonIndex])}
              className="rounded-lg border border-emerald-800 bg-emerald-950/30 px-4 py-2 text-xs font-semibold text-emerald-300"
            >
              {completed.includes(lessonIndex) ? "Lesson completed ✓" : "Mark lesson complete"}
            </button>
            <button
              type="button"
              onClick={() => {
                setLessonIndex((old) => (old + 1) % guide.lessons.length);
                setShowExpected(false);
              }}
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200"
            >
              Next lesson →
            </button>
          </div>
        </div>
      </article>

      <article className="rounded-2xl border border-slate-800 bg-[#0d1523] p-5 sm:p-7">
        <h3 className="text-lg font-bold text-white">Learning workflow</h3>
        <p className="mt-2 text-sm text-slate-400">Mark each activity after completing it.</p>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-cyan-500 transition-all" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-xs text-slate-400">{completed.filter((value) => Number.isInteger(value) && value >= 100 && value < 100 + guide.workflow.length).length} of {guide.workflow.length} workflow steps completed</p>
        <div className="mt-4 space-y-3">
          {guide.workflow.map((step, index) => (
            <label key={step} className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/50 p-3">
              <input
                type="checkbox"
                checked={completed.includes(index + 100)}
                onChange={(event) => setCompleted((old) =>
                  event.target.checked
                    ? [...old, index + 100]
                    : old.filter((value) => value !== index + 100)
                )}
                className="mt-1 accent-cyan-500"
              />
              <span className="text-sm leading-6 text-slate-300">{step}</span>
            </label>
          ))}
        </div>
      </article>

      <article className="rounded-2xl border border-slate-800 bg-[#0d1523] p-5 sm:p-7">
        <h3 className="text-lg font-bold text-white">Real-world production guidance</h3>
        <p className="mt-3 text-sm leading-7 text-slate-300">{guide.production}</p>
      </article>

      <article className="rounded-2xl border border-cyan-900/70 bg-[#0d1523] p-5 sm:p-7">
        <div className="text-xs font-bold uppercase tracking-wider text-cyan-300">KNOWLEDGE CHECK</div>
        <h3 className="mt-2 text-lg font-bold text-white">{guide.question}</h3>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {guide.options.map((option) => (
            <button
              key={option}
              type="button"
              disabled={checked}
              onClick={() => setAnswer(option)}
              className={`rounded-lg border p-3 text-left text-sm ${
                answer === option
                  ? "border-cyan-500 bg-cyan-950/40 text-cyan-200"
                  : "border-slate-700 bg-slate-900/60 text-slate-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {!checked ? (
          <button
            type="button"
            disabled={!answer}
            onClick={() => setChecked(true)}
            className="mt-4 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 disabled:opacity-40"
          >
            Check answer
          </button>
        ) : (
          <div className={`mt-4 rounded-xl border p-4 ${
            answer === guide.answer
              ? "border-emerald-800 bg-emerald-950/20"
              : "border-amber-800 bg-amber-950/20"
          }`}>
            <div className="font-bold text-white">
              {answer === guide.answer ? "Correct answer!" : `Correct answer: ${guide.answer}`}
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-300">{guide.reason}</p>
            <button
              type="button"
              onClick={() => { setAnswer(""); setChecked(false); }}
              className="mt-3 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-200"
            >
              Try again
            </button>
          </div>
        )}
      </article>
    </section>
  );
}



