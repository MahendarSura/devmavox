
export interface YamlFilesProblem {
  issue: string;
  solution: string;
}

export interface YamlFilesSection {
  heading: string;
  explanation: string;
  steps: string[];
  commands?: string;
  config?: string;
  problems: YamlFilesProblem[];
}

export interface YamlFilesNote {
  title: string;
  description: string;
  sections: YamlFilesSection[];
}

const yamlFilesData: YamlFilesNote = {
  title: "YAML Files – Complete Practical Notes",
  description:
    "Understand YAML from the beginning, learn its syntax and structure, and work with real DevOps configuration files used in Kubernetes, Docker Compose, Jenkins and GitHub Actions.",

  sections: [
    {
      heading: "1. Introduction to YAML – What Is YAML and Why Do DevOps Engineers Use It?",
      explanation: `WHAT IS YAML?

YAML is a human-readable data format used to store information in a structured way.

The full form commonly used today is "YAML Ain't Markup Language".

Think of YAML as a way of writing instructions and settings in a format that both humans and software can understand.

For example, imagine you want to tell a computer:
- Application name is backend.
- Application should run three copies.
- Container image is backend:1.0.
- Application should listen on port 3000.

You can write these details in a YAML file.

WHY DO WE NEED YAML?

In real DevOps projects, we manage many settings:
- Which application should run?
- How many copies should run?
- Which Docker image should be used?
- Which ports should be open?
- Which environment variables are required?
- What should happen when an application fails?
- Which steps should run in a CI/CD pipeline?

Instead of writing all these settings manually every time, we store them in configuration files.

YAML makes these configurations easier to read, review, maintain and share.

WHERE IS YAML USED?

1. Kubernetes:
   YAML defines Pods, Deployments, Services, ConfigMaps, Secrets, Ingress and many other resources.

2. Docker Compose:
   YAML describes multiple containers, networks, volumes and application dependencies.

3. GitHub Actions:
   YAML defines automated workflows such as build, test and deployment.

4. Ansible:
   YAML is used to define playbooks, tasks, variables and automation instructions.

5. Prometheus:
   YAML stores scrape configurations and alerting rules.

6. Cloud-native tools:
   Many DevOps and infrastructure tools use YAML for configuration.

IMPORTANT:

YAML is a data serialization format. It does not automatically execute commands just because a file contains YAML.

The application or tool that reads the file decides what the configuration means.

For example:
- Kubernetes reads Kubernetes resource YAML.
- Docker Compose reads compose.yaml.
- GitHub Actions reads workflow YAML files.
- Ansible reads playbook YAML.

A YAML file written for Kubernetes cannot automatically be used as a Docker Compose file. Each tool expects its own structure and fields.

YAML FILE EXTENSIONS:

Common extensions:
- .yaml
- .yml

Both extensions are commonly accepted. The important thing is that the content follows valid YAML syntax and the target tool's schema.

REAL-WORLD EXAMPLE:

A DevOps engineer receives a requirement:

"Deploy our backend application with three replicas and expose it through a Kubernetes Service."

The engineer writes a Deployment YAML and a Service YAML.

Kubernetes reads those files and creates the requested resources, provided the configuration is valid and the cluster has the required permissions and capacity.

This is why YAML is an important skill for DevOps engineers.`,
      steps: [
        "First understand that YAML stores structured information rather than being a programming language.",
        "Identify which tool will read the YAML file. The tool determines the required structure.",
        "Create a file with the correct extension, such as deployment.yaml.",
        "Write configuration using indentation and key-value pairs.",
        "Validate the YAML syntax before using it.",
        "Validate the configuration against the target tool's schema.",
        "Apply or execute the configuration using the relevant tool.",
        "Verify the actual result. A valid YAML file does not guarantee that the application or infrastructure will work."
      ],
      commands: `# Check whether Python is available
python --version

# Install a YAML parser for Python
python -m pip install PyYAML

# Validate YAML syntax using Python
python -c "import yaml; yaml.safe_load(open('config.yaml'))"

# Kubernetes YAML validation
kubectl apply --dry-run=client -f deployment.yaml

# Kubernetes server-side validation
kubectl apply --dry-run=server -f deployment.yaml

# Validate Docker Compose configuration
docker compose config

# Check the GitHub Actions workflow structure
# Use the GitHub Actions workflow editor or an appropriate YAML linter.

# Important:
# Syntax validation and application-specific validation are different.
# A YAML file can be syntactically valid but still contain unsupported fields.`,
      config: `EXAMPLE – A SIMPLE YAML FILE

application:
  name: backend
  version: "1.0"
  environment: production
  replicas: 3
  port: 3000

HOW TO READ THIS:

application:
This is the main section or parent key.

name:
The application name is backend.

version:
The application version is 1.0.

environment:
The intended environment is production.

replicas:
The desired number of application copies is three.

port:
The application port is 3000.

The indentation shows which values belong under application.

This example is generic YAML. It is not a Kubernetes resource until it follows Kubernetes' required resource structure.

EXAMPLE – SAME INFORMATION AS A SIMPLE LIST

application:
  name: backend
  environments:
    - development
    - testing
    - production

The dash (-) indicates an item in a list.

EXAMPLE – BOOLEAN AND NUMERIC VALUES

application:
  enabled: true
  replicas: 3
  port: 3000
  debug: false

Boolean values represent true or false.
Numbers can be written without quotation marks.

EXAMPLE – STRING VALUES

application:
  name: "backend service"
  version: "2.0"
  description: "Customer API application"

Quotation marks are useful when values contain special characters, ambiguous formats or leading zeros.

EXAMPLE – COMMENTS

# This is a comment.
# Comments explain the configuration to other engineers.

application:
  name: backend
  replicas: 3 # Desired number of application replicas`,
      problems: [
        {
          issue: "The engineer does not know which YAML structure to use.",
          solution: "Identify the target tool first. Read that tool's documentation and use a valid example for the correct resource or configuration type."
        },
        {
          issue: "The YAML file is valid but Kubernetes rejects it.",
          solution: "Syntax validation checks YAML formatting. Kubernetes also validates API versions, resource kinds, field names, data types and cluster-specific requirements."
        },
        {
          issue: "The file has a .yaml extension but the application cannot read it.",
          solution: "Check the file path, filename, permissions and whether the application expects a particular configuration filename or directory."
        }
      ]
    },

    {
      heading: "2. YAML Syntax – Indentation, Keys, Values and Basic Rules",
      explanation: `YAML is easy to read, but indentation is extremely important.

Unlike many programming languages, YAML uses spaces to show the relationship between different values.

RULE 1 – USE SPACES FOR INDENTATION

Use spaces instead of tabs.

A common convention is two spaces for each indentation level. The required indentation must be consistent.

RULE 2 – KEY AND VALUE

A key identifies a setting. A value contains the information assigned to that setting.

Example:
name: backend

Here:
name = key
backend = value

RULE 3 – PARENT AND CHILD KEYS

A parent key groups related settings.

Example:
database:
  host: localhost
  port: 5432

The host and port belong to database because they are indented under it.

RULE 4 – LISTS

A list stores multiple values under one key.

Example:
tools:
  - Docker
  - Kubernetes
  - Jenkins

Each dash represents one list item.

RULE 5 – NESTED STRUCTURE

A nested structure means one section contains another section.

This is common in Kubernetes because a resource contains metadata, specifications, containers, ports and resource settings.

RULE 6 – COMMENTS

A comment starts with # when it is not part of a quoted string.

Comments explain why a setting exists. They are not interpreted as configuration values.

RULE 7 – STRINGS AND QUOTATION MARKS

YAML supports plain strings, single-quoted strings and double-quoted strings.

Use quotation marks when a value may be interpreted as a Boolean, number, date or special YAML value.

For example, a version or identifier such as "0012" should be quoted if the leading zeros are meaningful.

RULE 8 – MULTILINE STRINGS

The | symbol preserves line breaks.
The > symbol folds many line breaks into a more continuous string.

These are useful for scripts, messages and multiline configuration values.

RULE 9 – NULL VALUES

A null value means that no value is assigned.

It can be represented using null or ~.

RULE 10 – ANCHORS AND ALIASES

Anchors and aliases allow repeated YAML structures to be reused in some YAML processors.

They can reduce duplication, but should be used carefully because complex aliases can make configuration difficult to understand.

IMPORTANT:

YAML syntax is only the first step. Every DevOps tool also has its own rules about allowed fields and values.`,
      steps: [
        "Write the parent key followed by a colon.",
        "Move to the next line and indent child values consistently.",
        "Use a dash for each item in a list.",
        "Use quotation marks for values that could be interpreted incorrectly.",
        "Use comments to explain important configuration decisions.",
        "Use the correct multiline syntax when storing scripts or text blocks.",
        "Avoid tabs and inconsistent indentation.",
        "Run a YAML parser or linter after editing the file."
      ],
      commands: `# Check the contents of a YAML file
Get-Content .\\config.yaml

# Search for tab characters in a file using PowerShell
Select-String -Path .\\config.yaml -Pattern "\`t"

# Validate YAML using Python
python -c "import yaml; yaml.safe_load(open('config.yaml'))"

# Validate a Kubernetes resource
kubectl apply --dry-run=client -f deployment.yaml

# Validate a Docker Compose file
docker compose -f compose.yaml config`,
      config: `EXAMPLE 1 – NESTED KEYS

employee:
  name: Ravi
  role: DevOps Engineer
  location:
    city: Hyderabad
    country: India

EXPLANATION:
employee is the parent.
name, role and location belong to employee.
city and country belong to location.

EXAMPLE 2 – LIST OF TOOLS

devops_tools:
  - Git
  - Linux
  - Docker
  - Kubernetes
  - Terraform

EXPLANATION:
devops_tools contains five list items.

EXAMPLE 3 – LIST OF OBJECTS

developers:
  - name: Ravi
    team: Platform
  - name: Kumar
    team: Cloud

EXPLANATION:
Each dash begins a separate object.
Each object contains name and team.

EXAMPLE 4 – MULTILINE TEXT

application:
  startup_message: |
    Application starting
    Loading configuration
    Connecting to database

EXPLANATION:
The vertical bar preserves the line breaks.

EXAMPLE 5 – FOLDED TEXT

application:
  description: >
    This application handles
    customer orders and payments
    through REST APIs.

EXPLANATION:
The folded block generally combines these lines into a single paragraph.

EXAMPLE 6 – QUOTED VALUES

settings:
  release_id: "00125"
  enabled: "true"
  port: 3000
  environment: 'production'

EXPLANATION:
The first two values are strings because they are quoted.
The port is a number.

EXAMPLE 7 – NULL VALUE

database:
  password: null

EXPLANATION:
No password value is supplied here. Do not use this as a production secret configuration.

EXAMPLE 8 – ANCHOR AND ALIAS

default_resources: &default_resources
  cpu: "250m"
  memory: "256Mi"

backend:
  resources: *default_resources

frontend:
  resources: *default_resources

EXPLANATION:
&default_resources defines an anchor.
*default_resources reuses that structure.

Use anchors only when they improve readability and are supported by the target YAML processor.`,
      problems: [
        {
          issue: "YAML reports a mapping or indentation error.",
          solution: "Check the indentation levels around the reported line. Use spaces consistently and ensure child keys are indented beneath the correct parent."
        },
        {
          issue: "A list item is interpreted as belonging to the wrong section.",
          solution: "Check the dash position and indentation. Every list item must be aligned at the same level within its list."
        },
        {
          issue: "A value such as true, false or 0012 is interpreted differently than expected.",
          solution: "Use quotation marks when the value must remain a string. Inspect the parsed value with the same YAML library used by the target tool."
        },
        {
          issue: "A multiline script loses its formatting.",
          solution: "Use the literal block indicator | when line breaks must be preserved. Check the indentation of the content under the block."
        }
      ]
    },

    {
      heading: "3. Kubernetes YAML – Understand the Structure of a Real Kubernetes Resource",
      explanation: `Kubernetes is one of the most important tools that uses YAML in DevOps.

A Kubernetes YAML file describes the desired state of a resource.

For example, a Deployment YAML can tell Kubernetes:

"I want three copies of my backend application to run."

Kubernetes controllers continuously compare the desired state with the actual state and work to make them match.

THE FOUR MAIN FIELDS:

1. apiVersion:
   Identifies the Kubernetes API version used by the resource.

2. kind:
   Identifies the resource type, such as Deployment, Service, Pod or ConfigMap.

3. metadata:
   Contains information such as resource name, namespace and labels.

4. spec:
   Contains the desired configuration of the resource.

UNDERSTAND A DEPLOYMENT:

A Deployment manages application replicas through ReplicaSets.

When you specify replicas: 3, Kubernetes attempts to maintain three matching Pods.

If one Pod fails, the controller can create another Pod to maintain the desired count, provided the cluster has the necessary capacity and the failure can be recovered.

UNDERSTAND A SERVICE:

Pods are temporary. Their IP addresses can change when Pods are recreated.

A Service provides a stable network endpoint for a group of matching Pods.

A Service uses labels and selectors to identify the Pods that should receive traffic.

UNDERSTAND A CONFIGMAP:

A ConfigMap stores non-sensitive configuration data separately from the container image.

Examples:
- Application environment name.
- Feature flags.
- Non-secret configuration values.

UNDERSTAND A SECRET:

A Kubernetes Secret stores sensitive configuration such as passwords or tokens.

Important: Base64 encoding is not encryption. Production environments should use appropriate encryption at rest, access controls and external secret-management solutions.

UNDERSTAND NAMESPACE:

A Namespace separates resources into logical groups.

For example:
- development
- testing
- staging
- production

Namespaces help organize resources and apply access controls and quotas. They are not a complete security boundary by themselves.

HOW KUBERNETES USES THE YAML:

1. Engineer writes a resource manifest.
2. kubectl sends the request to the Kubernetes API server.
3. The API server authenticates and authorizes the request.
4. Admission controls and schema validation are applied.
5. The desired resource state is stored in etcd.
6. Controllers observe the change and reconcile the cluster.
7. Scheduler assigns unscheduled Pods to suitable nodes.
8. Kubelet starts containers through the container runtime.
9. Status is reported back to the control plane.

The exact internal flow depends on the resource type. A ConfigMap, Service and Deployment are handled by different Kubernetes components.`,
      steps: [
        "Step 1 – Decide what resource is required: Deployment, Service, ConfigMap, Secret or another Kubernetes object.",
        "Step 2 – Select the correct apiVersion and kind from the Kubernetes documentation for the target cluster version.",
        "Step 3 – Add metadata.name and the required namespace.",
        "Step 4 – Add labels to identify the application and organize related resources.",
        "Step 5 – Write the spec section with the desired state.",
        "Step 6 – For a Deployment, configure the Pod selector and ensure it matches the labels in the Pod template.",
        "Step 7 – Configure the container image, ports, resources and health probes.",
        "Step 8 – Validate the manifest locally and against the cluster API server.",
        "Step 9 – Apply the manifest using kubectl apply.",
        "Step 10 – Verify the actual resource state using kubectl get, describe, logs and events.",
        "Step 11 – Test application connectivity through the Service or Ingress.",
        "Step 12 – Store the approved manifest in version control so changes can be reviewed and tracked."
      ],
      commands: `# Check Kubernetes cluster
kubectl cluster-info

# List available API resources
kubectl api-resources

# List supported API versions and kinds
kubectl api-versions

# Check namespaces
kubectl get namespaces

# Create a namespace
kubectl create namespace devops-demo

# Validate YAML without applying it
kubectl apply --dry-run=client -f deployment.yaml

# Validate against the API server
kubectl apply --dry-run=server -f deployment.yaml

# Apply a Deployment
kubectl apply -f deployment.yaml

# Apply all YAML files in a directory
kubectl apply -f ./k8s/

# Check Deployment
kubectl get deployments -n devops-demo

# Check Pods
kubectl get pods -n devops-demo -o wide

# Inspect a Deployment
kubectl describe deployment backend -n devops-demo

# Inspect logs
kubectl logs deployment/backend -n devops-demo

# Delete a resource defined in a file
kubectl delete -f deployment.yaml`,
      config: `EXAMPLE 1 – KUBERNETES DEPLOYMENT

apiVersion: apps/v1
kind: Deployment

metadata:
  name: backend
  namespace: devops-demo

spec:
  replicas: 3

  selector:
    matchLabels:
      app: backend

  template:
    metadata:
      labels:
        app: backend

    spec:
      containers:
        - name: backend
          image: nginx:1.27

          ports:
            - containerPort: 80

          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "500m"
              memory: "256Mi"

EXPLANATION:

apiVersion:
apps/v1 is the API version for Deployment.

kind:
Deployment tells Kubernetes what resource to create.

metadata.name:
The Deployment name is backend.

namespace:
The resource belongs to devops-demo.

replicas:
Kubernetes attempts to maintain three Pods.

selector:
The Deployment manages Pods with the matching app label.

template:
Defines how each Pod should be created.

containers:
Defines the container image and its settings.

resources:
Defines CPU and memory requests and limits.

EXAMPLE 2 – KUBERNETES SERVICE

apiVersion: v1
kind: Service

metadata:
  name: backend-service
  namespace: devops-demo

spec:
  type: ClusterIP

  selector:
    app: backend

  ports:
    - port: 80
      targetPort: 80
      protocol: TCP

EXPLANATION:

The Service selects Pods with app: backend.

Port 80 is the Service port.
targetPort 80 is the destination container port.

ClusterIP makes the Service reachable inside the cluster by default.

EXAMPLE 3 – CONFIGMAP

apiVersion: v1
kind: ConfigMap

metadata:
  name: backend-config
  namespace: devops-demo

data:
  APP_ENV: "production"
  LOG_LEVEL: "info"

EXPLANATION:

ConfigMap stores non-sensitive configuration.

EXAMPLE 4 – SECRET

apiVersion: v1
kind: Secret

metadata:
  name: backend-secret
  namespace: devops-demo

type: Opaque

stringData:
  DB_USERNAME: "appuser"
  DB_PASSWORD: "replace-with-secret"

IMPORTANT:
This is a learning example only. Do not commit real credentials to Git. Use an approved secret-management process.

EXAMPLE 5 – COMPLETE RESOURCE FLOW

deployment.yaml
      |
      v
Deployment
      |
      v
ReplicaSet
      |
      v
Three Pods
      |
      v
Service
      |
      v
Application Access

The Deployment creates and maintains Pods.
The Service provides stable access to matching Pods.`,
      problems: [
        {
          issue: "error: no matches for kind Deployment in version v1.",
          solution: "Deployment uses apps/v1, not v1. Verify apiVersion and kind using kubectl api-resources and the official Kubernetes API documentation."
        },
        {
          issue: "Deployment shows zero available replicas.",
          solution: "Check Pod status, image availability, resource requests, scheduling events and readiness probes. Inspect the ReplicaSet and Pod events."
        },
        {
          issue: "Service has no endpoints.",
          solution: "Compare the Service selector with the labels on the Pod template. Confirm that Pods are Ready and belong to the expected namespace."
        },
        {
          issue: "Pods cannot pull the container image.",
          solution: "Check image name, tag or digest, registry connectivity, imagePullSecrets and node permissions. Inspect Pod events for the exact reason."
        },
        {
          issue: "Kubernetes rejects the YAML because a field is unknown.",
          solution: "Verify the field name, indentation, resource API version and whether that field is supported by the target Kubernetes version."
        },
        {
          issue: "Application cannot read a ConfigMap value.",
          solution: "Check that the ConfigMap exists in the same namespace, the key name matches, and the Deployment correctly references it through env, envFrom or a volume."
        }
      ]
    },

    {
      heading: "4. YAML Validation, Linting and Safe Configuration Management",
      explanation: `Writing YAML is not enough. A professional DevOps engineer must validate configuration before applying it.

WHY VALIDATION MATTERS:

One wrong indentation, incorrect field name or invalid value can stop a deployment.

In production, configuration mistakes can cause:
- Application downtime.
- Failed deployments.
- Incorrect access permissions.
- Unexpected resource creation.
- Broken CI/CD pipelines.
- Security exposure.

THREE LEVELS OF VALIDATION:

1. YAML Syntax Validation:
Checks whether the file follows YAML syntax.

2. Tool-Specific Validation:
Checks whether the configuration follows the target tool's structure and rules.

3. Runtime Validation:
Checks whether the configuration actually works in the target environment.

Example:
A Kubernetes Deployment YAML may pass YAML syntax validation but fail Kubernetes schema validation because the field name is incorrect.

It may also pass API validation but fail at runtime because the image cannot be pulled.

VALIDATION TOOLS:

- yamllint: Checks YAML formatting and common style issues.
- PyYAML: Parses YAML using Python.
- kubectl: Validates and applies Kubernetes manifests.
- docker compose config: Validates and renders Compose configuration.
- actionlint: Checks GitHub Actions workflow files.
- ansible-playbook --syntax-check: Checks Ansible playbook syntax.
- Terraform fmt and validate: Format and validate Terraform configuration. Terraform uses HCL, not YAML.

VERSION CONTROL:

Store configuration files in Git.

This provides:
- Change history.
- Code review.
- Rollback of configuration changes.
- Team collaboration.
- Auditability.

Do not make untracked production changes and forget to update the source configuration repository.

SECRETS:

Do not store real passwords, access tokens, private keys or cloud credentials in ordinary YAML files committed to Git.

Use appropriate secret stores and access controls.

ENVIRONMENT SEPARATION:

Development, staging and production environments may need different values.

Keep common configuration reusable, but separate environment-specific settings carefully.

Always review the final rendered configuration before applying it to production.`,
      steps: [
        "Step 1 – Save the YAML file with the correct filename and extension.",
        "Step 2 – Check indentation, tabs, quotation marks, list formatting and special characters.",
        "Step 3 – Run a YAML parser or yamllint to check syntax and style.",
        "Step 4 – Run the target tool's validation command, such as kubectl dry-run or docker compose config.",
        "Step 5 – Review the configuration diff in Git before merging.",
        "Step 6 – Check for hardcoded credentials, unsafe permissions and unnecessary privileges.",
        "Step 7 – Validate environment-specific values and referenced resources.",
        "Step 8 – Test the configuration in a non-production environment.",
        "Step 9 – Apply the approved configuration through the normal deployment process.",
        "Step 10 – Verify the runtime behavior and monitor for unexpected changes."
      ],
      commands: `# Install yamllint
python -m pip install yamllint

# Check YAML style and common mistakes
yamllint deployment.yaml

# Parse YAML using Python
python -c "import yaml; yaml.safe_load(open('deployment.yaml'))"

# Kubernetes client-side dry run
kubectl apply --dry-run=client -f deployment.yaml

# Kubernetes server-side dry run
kubectl apply --dry-run=server -f deployment.yaml

# Docker Compose validation
docker compose config

# GitHub Actions validation (if actionlint is installed)
actionlint

# Ansible syntax validation
ansible-playbook --syntax-check site.yml

# Review changed configuration files
git status

git diff

# Check which files are staged
git diff --cached`,
      config: `EXAMPLE – A SAFE CONFIGURATION REVIEW

application:
  name: backend
  environment: staging

  resources:
    replicas: 3
    cpu: "250m"
    memory: "256Mi"

  database:
    host: staging-db.internal
    port: 5432

EXPLANATION:

This configuration stores ordinary application settings.

It does not contain a database password.

The password should be supplied through a secure secret-management mechanism rather than committed as plain text.

EXAMPLE – ENVIRONMENT-SPECIFIC FILE ORGANIZATION

config/
  common.yaml
  development.yaml
  staging.yaml
  production.yaml

EXPLANATION:

common.yaml:
Stores settings shared across environments.

development.yaml:
Stores development-specific values.

staging.yaml:
Stores staging-specific values.

production.yaml:
Stores production-specific non-secret values.

The actual loading and merging behavior depends on the application or deployment tool. YAML files do not automatically merge simply because they are stored in the same directory.

EXAMPLE – GIT REVIEW WORKFLOW

Engineer edits YAML
       |
       v
Run YAML validation
       |
       v
Run tool-specific validation
       |
       v
Create Git commit
       |
       v
Open Pull Request
       |
       v
Review configuration diff
       |
       v
Approve and merge
       |
       v
Deploy through approved pipeline
       |
       v
Verify actual runtime state`,
      problems: [
        {
          issue: "YAML passes a parser but the deployment fails.",
          solution: "Run tool-specific validation and inspect runtime events. Syntax validation alone cannot verify image availability, cluster permissions, network access or resource capacity."
        },
        {
          issue: "yamllint reports indentation or trailing-space warnings.",
          solution: "Correct the formatting according to the project's YAML style rules. Agree on a consistent indentation convention and validate files before merging."
        },
        {
          issue: "Different environments use incorrect configuration values.",
          solution: "Review the environment selection and configuration-loading logic. Make the deployment pipeline explicitly select the intended environment and validate the rendered output."
        },
        {
          issue: "Credentials are accidentally committed to Git.",
          solution: "Treat the credential as exposed. Revoke or rotate it immediately, investigate its use, remove it from future commits and adopt secret scanning and secure secret management."
        }
      ]
    }
  ]
};

export default yamlFilesData;
