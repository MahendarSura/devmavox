export type Problem = {
  issue: string;
  solution: string;
};

export type NoteSection = {
  heading: string;
  explanation: string;
  steps: string[];
  commands?: string;
  config?: string;
  problems: Problem[];
};

export type NoteData = {
  title: string;
  description: string;
  sections: NoteSection[];
};

const bestPracticesData: NoteData = {
  title: "YAML and Configuration Best Practices",
  description:
    "Complete A-to-Z practical learning notes covering configuration design, YAML standards, Kubernetes security, Docker Compose, Jenkins, GitHub Actions, Terraform, secrets management, environment separation, validation, reliability, monitoring, version control, troubleshooting and production-ready DevOps practices.",

  sections: [
    {
      heading: "1. Understand Why Configuration Best Practices Matter",
      explanation:
        "Configuration is not just a collection of settings. It controls how applications start, how services communicate, how infrastructure is created and how deployments behave. A small configuration mistake can cause a complete production outage. For example, a wrong Kubernetes Service selector can stop traffic from reaching application Pods. A wrong Docker volume mapping can cause application data to disappear. A missing Jenkins credential can stop a deployment. An incorrect Terraform resource setting can replace an important cloud resource. Best practices help us avoid these problems by making configuration readable, secure, reusable, testable and predictable. When writing configuration, think about the next engineer who will maintain it. That engineer should understand what the configuration does, why a particular value exists and how to safely change it. Good configuration should also make it easier to identify mistakes before they reach production.",
      steps: [
        "Understand the purpose of the configuration before writing it.",
        "Choose meaningful names for files, resources, services and variables.",
        "Keep each configuration file focused on a clear responsibility.",
        "Use standard formatting and consistent indentation.",
        "Separate environment-specific values from common settings.",
        "Never store production passwords or access tokens directly in source-controlled configuration.",
        "Validate configuration before applying it.",
        "Use Git to track configuration changes.",
        "Review risky changes before production deployment.",
        "Document important dependencies, assumptions and recovery procedures."
      ],
      commands:
        "# Check the configuration files in a repository\nfind . -type f \\( -name '*.yaml' -o -name '*.yml' -o -name '*.tf' -o -name 'Jenkinsfile' \\)\n\n# Check current Git changes\ngit status\n\n# Review all configuration changes\ngit diff\n\n# Check which configuration files are tracked by Git\ngit ls-files | grep -E '\\.(yaml|yml|tf)$|Jenkinsfile'",
      problems: [
        {
          issue:
            "A configuration file is difficult for another engineer to understand.",
          solution:
            "Use meaningful names, consistent formatting, clear explanations and smaller logical sections. Avoid unnecessary complexity and unexplained values."
        },
        {
          issue:
            "Production problems happen because of small configuration changes.",
          solution:
            "Introduce validation, code review, staged deployment and rollback procedures. Do not directly apply unreviewed changes to production."
        }
      ]
    },

    {
      heading: "2. YAML Formatting and Indentation Best Practices",
      explanation:
        "YAML is widely used in DevOps because it is human-readable and supports structured data. However, YAML depends on indentation to understand the relationship between parent and child values. This means that spaces are not just visual formatting; they determine the structure of the configuration. YAML uses mappings for key-value pairs and sequences for lists. For example, a Kubernetes Deployment contains a spec object, which contains a template object, which contains another spec object. If indentation is incorrect, the parser may reject the file or interpret the values differently from what the engineer intended. Use spaces instead of tabs. Keep indentation consistent, normally two spaces for common DevOps YAML files. Quote values when their type could be misunderstood. Review long YAML files carefully and use a YAML linter or editor that highlights indentation errors.",
      steps: [
        "Use spaces instead of tabs in every YAML file.",
        "Use a consistent indentation style throughout the project.",
        "Keep child fields aligned under their parent field.",
        "Use a dash to identify each item in a YAML list.",
        "Keep key names consistent and avoid unnecessary abbreviations.",
        "Use quotes for values that may be interpreted as another data type.",
        "Use comments to explain non-obvious configuration decisions.",
        "Do not use comments as a replacement for clear field names.",
        "Avoid unnecessary deeply nested structures.",
        "Validate the YAML after editing."
      ],
      commands:
        "# Install yamllint in a Python environment when required\npython -m pip install yamllint\n\n# Validate a YAML file\nyamllint deployment.yaml\n\n# Validate all YAML files in a directory\nyamllint .\n\n# Display a YAML file with line numbers\nnl -ba deployment.yaml",
      config:
        "# Good YAML structure\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web-app\n  labels:\n    app: web-app\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: web-app\n  template:\n    metadata:\n      labels:\n        app: web-app\n    spec:\n      containers:\n        - name: web\n          image: nginx:1.27\n          ports:\n            - containerPort: 80\n\n# Avoid inconsistent indentation, tabs and unclear nesting.\n# Keep list items and child fields correctly aligned.",
      problems: [
        {
          issue:
            "YAML reports mapping values are not allowed or an indentation error.",
          solution:
            "Check spaces before the affected line, confirm colons are followed by proper spacing and ensure that child properties are aligned under the correct parent."
        },
        {
          issue:
            "A YAML value is interpreted as a boolean or number instead of text.",
          solution:
            "Quote the value when it should be treated as a string. For example, use \"true\" when the application expects the text true rather than a YAML boolean."
        },
        {
          issue:
            "A file works in one editor but fails in another.",
          solution:
            "Check for hidden tab characters, inconsistent line endings and unsupported YAML syntax. Use a consistent editor configuration and validate with the target tool."
        }
      ]
    },

    {
      heading: "3. Use Meaningful Names and Consistent Naming Conventions",
      explanation:
        "Naming is one of the simplest but most important configuration practices. In a production environment, an engineer may manage hundreds of Pods, Deployments, Services, Terraform resources, pipeline jobs and cloud resources. If every resource has an unclear name, troubleshooting becomes difficult. A name such as app1 or test2 does not explain its purpose. A name such as payments-api-production gives more useful information. Use a consistent naming pattern that identifies the project, component and environment where appropriate. Kubernetes labels and annotations should also follow an agreed standard. Terraform resource names should explain the role of the resource. Docker Compose service names should describe the application component. Consistent names make logs, dashboards, alerts and deployment commands easier to understand. Remember that some platforms have naming restrictions, so follow the platform's naming rules.",
      steps: [
        "Choose a naming pattern for the project.",
        "Include the application or service name where useful.",
        "Use environment names such as development, staging and production consistently.",
        "Use lowercase names and hyphens where supported by the platform.",
        "Keep Kubernetes labels short, meaningful and reusable.",
        "Use Terraform resource names that describe their purpose.",
        "Use clear Docker Compose service names such as backend, frontend and database.",
        "Avoid names that contain personal information or temporary developer details.",
        "Do not change immutable or identity-sensitive resource names without understanding the impact.",
        "Document the naming convention in the project README."
      ],
      config:
        "# Kubernetes naming example\nmetadata:\n  name: payments-api-production\n  labels:\n    app.kubernetes.io/name: payments-api\n    app.kubernetes.io/component: backend\n    app.kubernetes.io/part-of: payment-platform\n    environment: production\n\n# Docker Compose naming example\nservices:\n  frontend:\n    image: example/frontend:1.0\n  backend:\n    image: example/backend:1.0\n  database:\n    image: postgres:16\n\n# Terraform naming example\nresource \"aws_s3_bucket\" \"application_logs\" {\n  bucket = \"replace-with-a-globally-unique-approved-name\"\n}",
      problems: [
        {
          issue:
            "Engineers cannot identify which environment a resource belongs to.",
          solution:
            "Use consistent environment labels, resource names and tags. Make sure monitoring and cost reports use the same environment values."
        },
        {
          issue:
            "Resource names are inconsistent across tools.",
          solution:
            "Create a naming standard for Kubernetes, Terraform, Docker Compose and CI/CD resources, then apply it consistently."
        }
      ]
    },

    {
      heading: "4. Keep Configuration Files Small, Organized and Modular",
      explanation:
        "One very large configuration file may work initially, but it becomes difficult to understand as a project grows. A better approach is to separate configuration according to responsibility. In Kubernetes, a Deployment, Service, ConfigMap and Ingress can be maintained as separate manifests or organized in a controlled directory. In Terraform, provider requirements, variables, resources and outputs are commonly separated into logical files. In GitHub Actions, separate workflow files can handle CI, security scanning and release deployment. In Docker Compose, use supported override or multiple-file patterns when the project requires different local environments. Splitting files should improve understanding, not create unnecessary complexity. Keep related configuration together and provide a clear directory structure. If configuration is reused across several environments or projects, consider a reusable module, template or shared workflow.",
      steps: [
        "Create a clear top-level configuration directory.",
        "Separate infrastructure configuration from application source code where appropriate.",
        "Keep Kubernetes resource definitions logically grouped.",
        "Separate Terraform variables, outputs, provider requirements and resource definitions.",
        "Use one GitHub Actions workflow for each clear automation responsibility.",
        "Use reusable Terraform modules for genuinely reusable infrastructure components.",
        "Avoid copying the same large configuration block into multiple environments.",
        "Keep file names descriptive and easy to search.",
        "Document how each configuration directory is used.",
        "Do not split a small file into many tiny files without a practical reason."
      ],
      config:
        "# Example DevOps repository layout\nproject/\n  app/\n  Dockerfile\n  compose.yaml\n  .dockerignore\n  .github/\n    workflows/\n      ci.yml\n      security-scan.yml\n      release.yml\n  kubernetes/\n    base/\n      deployment.yaml\n      service.yaml\n      configmap.yaml\n    overlays/\n      development/\n      staging/\n      production/\n  infrastructure/\n    versions.tf\n    provider.tf\n    variables.tf\n    main.tf\n    outputs.tf\n    modules/\n      network/\n      compute/\n  docs/\n    configuration-guide.md",
      problems: [
        {
          issue:
            "The same configuration is copied into several directories and becomes inconsistent.",
          solution:
            "Identify reusable parts and use Terraform modules, Kubernetes Kustomize overlays, Helm values or shared workflow mechanisms where appropriate."
        },
        {
          issue:
            "The project has too many small configuration files and nobody knows where settings belong.",
          solution:
            "Group files by responsibility, document the directory structure and avoid splitting configuration without a clear maintenance benefit."
        }
      ]
    },

    {
      heading: "5. Separate Development, Staging and Production Configuration",
      explanation:
        "Applications commonly run in multiple environments. Development is used for building and testing new functionality. Staging is used to verify changes in an environment that is closer to production. Production serves real users and business workloads. These environments often need different database endpoints, resource sizes, logging levels, domain names, credentials and access permissions. A common mistake is to copy the complete configuration file and manually edit it for every environment. Over time, the files become inconsistent and fixes applied to one environment are missed in another. A better approach is to keep common configuration reusable and supply environment-specific values through controlled overlays, variables or secret-management systems. Do not allow a development database endpoint or test credential to accidentally reach production. Production changes should have stricter approvals and access controls.",
      steps: [
        "Identify settings that are common across all environments.",
        "Identify settings that must change between environments.",
        "Keep application code and container image consistent where possible.",
        "Use environment-specific configuration values for endpoints and resource settings.",
        "Use separate credentials for each environment.",
        "Do not use production credentials in local development.",
        "Use protected environments for production deployment approvals.",
        "Restrict access to production infrastructure and secrets.",
        "Validate each environment's configuration before deployment.",
        "Promote tested application artifacts rather than rebuilding different application code for each environment without a reason."
      ],
      commands:
        "# Example Kubernetes namespace separation\nkubectl create namespace development\nkubectl create namespace staging\nkubectl create namespace production\n\n# List namespaces\nkubectl get namespaces\n\n# Inspect resources in a particular namespace\nkubectl get all -n staging\n\n# Terraform plan using an environment-specific variable file\nterraform plan -var-file=staging.tfvars",
      config:
        "# Example environment values\n# development.tfvars\naws_region  = \"ap-south-1\"\nenvironment = \"development\"\ninstance_type = \"t3.micro\"\n\n# staging.tfvars\naws_region  = \"ap-south-1\"\nenvironment = \"staging\"\ninstance_type = \"t3.small\"\n\n# production.tfvars\naws_region  = \"ap-south-1\"\nenvironment = \"production\"\ninstance_type = \"t3.medium\"\n\n# Keep confidential values outside these committed example files.\n# Use protected secret inputs for actual credentials.",
      problems: [
        {
          issue:
            "A staging deployment accidentally connects to the production database.",
          solution:
            "Check environment-specific endpoints and credentials. Use separate database identities and network permissions, and validate the resolved configuration before deployment."
        },
        {
          issue:
            "Development and production configuration have drifted significantly.",
          solution:
            "Reuse common configuration, maintain controlled environment overlays and regularly compare the effective configuration in each environment."
        },
        {
          issue:
            "Production deployment happens without approval.",
          solution:
            "Configure protected deployment environments, restricted permissions and mandatory review for production changes."
        }
      ]
    },

    {
      heading: "6. Secrets Management – Never Hardcode Passwords and Tokens",
      explanation:
        "A secret is sensitive information that should not be exposed to unauthorized users. Common examples include database passwords, cloud access keys, SSH private keys, registry passwords, API tokens and signing keys. Hardcoding these values in YAML, Jenkinsfiles, Dockerfiles, Terraform files or application source code is dangerous. Once a secret is committed to Git, it may remain in repository history, logs, build artifacts or copies made by other people. Deleting the line from the latest version does not make the credential safe. Rotate an exposed secret immediately. Use the secret-management facilities provided by the platform. Kubernetes Secrets, Jenkins Credentials, GitHub Actions Secrets and external secret managers serve different integration needs. Kubernetes Secret values are base64-encoded by default, not automatically encrypted. Use encryption at rest, RBAC, short-lived credentials and external secret-management solutions where appropriate. Also avoid printing secrets in terminal output and CI/CD logs.",
      steps: [
        "Identify all sensitive values required by the application and deployment process.",
        "Never write real secrets directly into files committed to Git.",
        "Use a safe example file with placeholder values for local development.",
        "Use GitHub Actions Secrets for protected workflow inputs.",
        "Use Jenkins Credentials for Jenkins pipeline authentication.",
        "Use Kubernetes Secrets or an external secret-management integration for workloads.",
        "Use cloud secret services or workload identity where appropriate.",
        "Restrict who can read, create and update each secret.",
        "Prefer short-lived credentials instead of permanent access keys.",
        "Rotate credentials according to policy and after suspected exposure.",
        "Do not echo secrets or enable shell tracing around sensitive commands.",
        "Check logs and build artifacts for accidental credential exposure."
      ],
      commands:
        "# Check whether .env files are tracked by Git\ngit ls-files | grep -E '(^|/)\\.env($|\\.)'\n\n# Check for Terraform state files tracked by Git\ngit ls-files | grep -E '\\.tfstate($|\\.)'\n\n# Check ignored files\ngit status --ignored\n\n# Create a local environment file with restricted permissions\nchmod 600 .env\n\n# Inspect Kubernetes Secret metadata without displaying secret values\nkubectl describe secret app-secret -n production",
      config:
        "# .env.example - safe template only\nAPP_ENV=development\nDB_HOST=localhost\nDB_PORT=5432\nDB_NAME=application\nDB_USER=appuser\nDB_PASSWORD=replace-with-a-local-secret\n\n# .gitignore\n.env\n.env.*\n!.env.example\n*.pem\n*.key\n*.tfstate\n*.tfstate.*\n\n# GitHub Actions example\n# The actual secret is stored in GitHub repository/environment settings.\n# Never place the real value in this YAML file.\n\nsteps:\n  - name: Deploy\n    env:\n      DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}\n    run: |\n      set +x\n      echo \"Starting deployment\"\n      # Use the token securely in the deployment command.",
      problems: [
        {
          issue:
            "A password or token was committed to Git.",
          solution:
            "Revoke or rotate the exposed credential immediately. Review access and logs, remove the secret from repository history through an approved process and move future secret handling to a secure system."
        },
        {
          issue:
            "Kubernetes Secret data is assumed to be encrypted because it is base64 encoded.",
          solution:
            "Base64 is encoding, not encryption. Enable encryption at rest, use strict RBAC and consider an external secret manager."
        },
        {
          issue:
            "A pipeline prints sensitive information in its console output.",
          solution:
            "Remove unsafe echo and shell tracing, rotate any exposed credentials and inspect stored build logs. Use controlled credential bindings."
        }
      ]
    },

    {
      heading: "7. Least Privilege – Give Only the Required Permissions",
      explanation:
        "Least privilege means giving a user, service account, pipeline or cloud identity only the permissions needed to perform its specific task. A CI pipeline that only needs to read repository files should not automatically receive permission to delete cloud resources. A Kubernetes application that only reads a ConfigMap should not receive cluster-admin privileges. A Terraform deployment identity should receive only the cloud permissions required by the infrastructure it manages. Excessive permissions increase the impact of accidental commands, compromised credentials and malicious code. Separate build permissions from deployment permissions. Use dedicated identities for development, staging and production. Review access regularly and remove unused credentials. Permission design is not a one-time activity; it must change when the application's responsibilities change.",
      steps: [
        "List the operations each user, job and service account must perform.",
        "Create separate identities for separate responsibilities.",
        "Avoid using administrator credentials for ordinary application operations.",
        "Restrict Kubernetes RBAC permissions to required namespaces and resources.",
        "Set minimal permissions in GitHub Actions workflows.",
        "Use scoped Jenkins credentials and restrict access to production jobs.",
        "Use IAM roles and policies for cloud automation.",
        "Prefer short-lived identity mechanisms where supported.",
        "Review permissions periodically.",
        "Remove unused accounts, tokens and credentials.",
        "Test that the restricted identity can perform its required work without receiving unnecessary permissions."
      ],
      commands:
        "# View Kubernetes RBAC resources\nkubectl get roles -A\nkubectl get rolebindings -A\nkubectl get clusterroles\n\n# Check whether a user can perform a particular action\nkubectl auth can-i get pods -n production\n\n# Check whether a service account can list Secrets\nkubectl auth can-i list secrets --as=system:serviceaccount:production:app-service-account -n production\n\n# Check AWS identity used by the current CLI session\naws sts get-caller-identity",
      config:
        "# Example restricted GitHub Actions permissions\nname: Read-only CI\n\non:\n  pull_request:\n\npermissions:\n  contents: read\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm test --if-present\n\n# Example Kubernetes namespace-scoped Role\napiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  name: pod-reader\n  namespace: production\nrules:\n  - apiGroups: [\"\"]\n    resources: [\"pods\"]\n    verbs: [\"get\", \"list\", \"watch\"]",
      problems: [
        {
          issue:
            "An application has cluster-admin permissions even though it only needs to read its own resources.",
          solution:
            "Create a namespace-scoped Role and RoleBinding with only the required operations. Remove unnecessary cluster-wide privileges."
        },
        {
          issue:
            "A CI token has permission to modify unrelated repositories or cloud resources.",
          solution:
            "Reduce token scopes and cloud IAM permissions. Separate identities for build, release and infrastructure deployment."
        }
      ]
    },

    {
      heading: "8. Pin Versions and Avoid Uncontrolled Latest Tags",
      explanation:
        "A version identifies a specific release of a tool, provider, container image or dependency. If a configuration uses an unpinned value such as latest, the actual software may change without a corresponding change in the configuration file. This can create unexpected behavior. For example, a Docker image that works today may point to a different release next week. A Terraform provider upgrade may change resource behavior. A GitHub Actions dependency may introduce a breaking change or security risk. Pinning versions improves reproducibility and makes debugging easier. However, pinning does not mean keeping old versions forever. Versions must be updated through a controlled patching and review process. Use exact versions or carefully selected version constraints according to the tool and risk. For highly sensitive third-party GitHub Actions, pinning to a verified commit SHA can improve supply-chain security.",
      steps: [
        "Choose a supported version for every important tool and dependency.",
        "Use explicit container image tags instead of relying on latest.",
        "Use image digests when stronger immutability is required.",
        "Declare Terraform provider version constraints.",
        "Keep language runtime versions consistent across developer machines and CI.",
        "Use lockfiles for application dependencies.",
        "Pin third-party GitHub Actions to verified commit SHAs when your security policy requires it.",
        "Review release notes before upgrading.",
        "Test upgrades in development and staging.",
        "Update pinned versions regularly to receive security fixes.",
        "Record which version is used in each production environment."
      ],
      commands:
        "# Check Docker image information\ndocker image inspect nginx:1.27\n\n# Check Terraform version\nterraform version\n\n# Review Terraform provider lock file\ngrep -n 'provider' .terraform.lock.hcl\n\n# Check Node.js and npm versions\nnode --version\nnpm --version\n\n# Review dependency updates using the project's package manager",
      config:
        "# Terraform provider version constraint\nterraform {\n  required_version = \">= 1.6.0, < 2.0.0\"\n\n  required_providers {\n    aws = {\n      source  = \"hashicorp/aws\"\n      version = \"~> 5.0\"\n    }\n  }\n}\n\n# Docker Compose: use an explicit image version\nservices:\n  web:\n    image: nginx:1.27\n\n# GitHub Actions: example pinned action reference\n# Replace the illustrative placeholder with a verified full commit SHA.\n# uses: actions/checkout@<VERIFIED_40_CHARACTER_COMMIT_SHA>",
      problems: [
        {
          issue:
            "A deployment changes behavior even though application code did not change.",
          solution:
            "Check mutable image tags, dependency ranges, provider upgrades and external action references. Pin important dependencies and compare the actual versions used."
        },
        {
          issue:
            "Pinned versions become outdated and miss security fixes.",
          solution:
            "Maintain a regular dependency update process. Review security advisories, test upgrades and update lockfiles and version constraints in controlled changes."
        }
      ]
    },

    {
      heading: "9. Use Immutable Artifacts and Traceable Releases",
      explanation:
        "An artifact is a built output that can be deployed, such as a container image, application package or binary. A reliable release process should make it possible to identify exactly which source code produced the artifact. If the same image tag is overwritten repeatedly, it becomes difficult to know what code is running in production. Use unique version tags, commit-based tags or immutable image digests. Record the Git commit, build number and artifact version. Ideally, build an artifact once and promote that same artifact through development, staging and production after the required checks. This reduces differences between environments. It also helps incident responders identify the exact release that caused a problem and return to a known good version when rollback is required.",
      steps: [
        "Build the artifact from a known Git commit.",
        "Assign a unique and meaningful version.",
        "Store the artifact in a trusted registry or repository.",
        "Record the source commit and build metadata.",
        "Scan the artifact according to the organization's security policy.",
        "Promote the same tested artifact between environments.",
        "Avoid overwriting a previously released immutable version.",
        "Use image digests for deployments requiring exact image identity.",
        "Keep deployment history and rollback references.",
        "Verify the deployed artifact after rollout."
      ],
      commands:
        "# Build an application image with a commit-based tag\nGIT_SHA=$(git rev-parse --short HEAD)\ndocker build -t devmavox/app:$GIT_SHA .\n\n# Inspect the built image\ndocker image inspect devmavox/app:$GIT_SHA\n\n# List local images\ndocker images\n\n# Check the currently deployed Kubernetes image\nkubectl get deployment devmavox-app -o jsonpath='{.spec.template.spec.containers[*].image}'",
      config:
        "# Example Kubernetes container image reference\ncontainers:\n  - name: devmavox-app\n    image: registry.example.com/devmavox/app:REPLACE_WITH_RELEASE_VERSION\n    imagePullPolicy: IfNotPresent\n\n# For stronger image identity, use a verified digest:\n# image: registry.example.com/devmavox/app@sha256:REPLACE_WITH_VERIFIED_DIGEST\n\n# Record build metadata separately in your release process:\n# source_commit: verified Git commit\n# build_number: CI build number\n# image_digest: immutable registry digest",
      problems: [
        {
          issue:
            "The production environment runs a different image than the one tested in staging.",
          solution:
            "Record the artifact digest during testing and promote that exact artifact. Verify the image reference before production deployment."
        },
        {
          issue:
            "The team cannot identify which Git commit produced a running container.",
          solution:
            "Add build metadata, commit identifiers and release records. Use unique image tags and retain deployment history."
        }
      ]
    },

    {
      heading: "10. Kubernetes Configuration Best Practices",
      explanation:
        "Kubernetes configuration controls how workloads are deployed, connected, secured and maintained. A production-ready manifest should describe more than just a container image. It should include correct labels and selectors, suitable resource requests and limits, readiness and liveness probes, security settings, rollout behavior and the right configuration sources. Labels connect Kubernetes objects. For example, a Service selects Pods using labels. If those labels do not match, the Service may have no endpoints. Resource requests help the scheduler decide where a Pod can run. Limits help control resource consumption. Readiness probes determine whether a container should receive normal traffic. Liveness probes help detect containers that need restarting. Startup probes can protect slow-starting applications from premature liveness failures. Use namespaces and RBAC to separate responsibilities. Use persistent storage for stateful applications and avoid treating container-local storage as permanent data storage.",
      steps: [
        "Use the correct apiVersion and kind for each resource.",
        "Add meaningful metadata labels.",
        "Make Deployment selectors match Pod template labels.",
        "Define resource requests and limits based on measured workload needs.",
        "Configure readiness probes for traffic eligibility.",
        "Configure liveness probes to detect unrecoverable application failure.",
        "Use startup probes for applications that need longer startup time.",
        "Run containers as non-root when the image supports it.",
        "Disable unnecessary privilege escalation.",
        "Use dedicated service accounts and least-privilege RBAC.",
        "Use ConfigMaps for non-sensitive settings and Secrets or external secret managers for credentials.",
        "Use persistent volumes for data that must survive Pod replacement.",
        "Set replica counts and rollout strategies appropriate for availability requirements.",
        "Use namespaces to organize and isolate workloads.",
        "Validate manifests before applying them.",
        "Monitor rollouts and inspect events after changes."
      ],
      commands:
        "# Validate manifests on the client side\nkubectl apply --dry-run=client -f kubernetes/\n\n# Ask the API server to validate without saving the resources\nkubectl apply --dry-run=server -f kubernetes/\n\n# Apply configuration after review\nkubectl apply -f kubernetes/\n\n# Check workload status\nkubectl get deployments,pods,services -n production\n\n# Inspect resource details\nkubectl describe deployment devmavox-app -n production\n\n# Check rollout status\nkubectl rollout status deployment/devmavox-app -n production\n\n# Inspect recent events\nkubectl get events -n production --sort-by=.metadata.creationTimestamp",
      config:
        "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: devmavox-app\n  namespace: production\n  labels:\n    app: devmavox\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: devmavox\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 1\n      maxUnavailable: 0\n  template:\n    metadata:\n      labels:\n        app: devmavox\n    spec:\n      containers:\n        - name: app\n          image: registry.example.com/devmavox/app:REPLACE_WITH_VERSION\n          ports:\n            - name: http\n              containerPort: 3000\n          resources:\n            requests:\n              cpu: \"100m\"\n              memory: \"128Mi\"\n            limits:\n              cpu: \"500m\"\n              memory: \"512Mi\"\n          startupProbe:\n            httpGet:\n              path: /health\n              port: http\n            periodSeconds: 5\n            failureThreshold: 30\n          readinessProbe:\n            httpGet:\n              path: /health/ready\n              port: http\n            periodSeconds: 10\n          livenessProbe:\n            httpGet:\n              path: /health/live\n              port: http\n            periodSeconds: 20\n          securityContext:\n            allowPrivilegeEscalation: false\n            runAsNonRoot: true",
      problems: [
        {
          issue:
            "Kubernetes Service has no endpoints.",
          solution:
            "Compare the Service selector with Pod labels. Confirm that matching Pods are running and ready."
        },
        {
          issue:
            "Pods are frequently restarting after health probes were introduced.",
          solution:
            "Check whether the probe path and port are correct. Review startup time, probe thresholds and application readiness. Do not use an aggressive liveness probe for a slow-starting application."
        },
        {
          issue:
            "Pods remain Pending because of resource constraints.",
          solution:
            "Inspect kubectl describe pod and cluster capacity. Review resource requests, node availability, taints, affinity and quota settings."
        },
        {
          issue:
            "Application data disappears after Pod replacement.",
          solution:
            "Use an appropriate persistent volume and storage class. Do not rely on the container writable layer for important application data."
        }
      ]
    },

    {
      heading: "11. Kubernetes Resource Requests, Limits and Capacity Planning",
      explanation:
        "Resource requests and limits help Kubernetes manage CPU and memory consumption. A request tells the scheduler how much resource the container needs for placement decisions. A limit defines an upper boundary enforced by the container runtime and operating system mechanisms. CPU limits generally restrict CPU time, while memory limits can cause a container to be terminated when it exceeds its permitted memory. Setting requests too high can prevent Pods from being scheduled even when the application could run with less. Setting memory limits too low can cause repeated OOMKilled failures. Setting no meaningful limits can allow a workload to consume resources needed by other workloads. The correct values should come from testing, monitoring and expected traffic rather than copying arbitrary values. Use namespaces and resource quotas where required to prevent one team from consuming all cluster capacity.",
      steps: [
        "Measure normal CPU and memory usage under realistic workloads.",
        "Estimate peak usage and expected growth.",
        "Set CPU and memory requests based on scheduling needs.",
        "Set limits according to application behavior and cluster policy.",
        "Monitor throttling, memory pressure and restart events.",
        "Review requests and limits after major application changes.",
        "Use ResourceQuota and LimitRange where suitable.",
        "Test under load before changing production resource values.",
        "Do not assume that higher limits always improve performance."
      ],
      commands:
        "# Check resource usage when metrics-server is available\nkubectl top pods -n production\nkubectl top nodes\n\n# Inspect Pod resource configuration and status\nkubectl describe pod <pod-name> -n production\n\n# Check for OOMKilled containers\nkubectl get pods -n production -o wide\n\n# Inspect namespace quotas\nkubectl get resourcequota -n production\nkubectl describe resourcequota -n production",
      config:
        "apiVersion: v1\nkind: ResourceQuota\nmetadata:\n  name: production-quota\n  namespace: production\nspec:\n  hard:\n    requests.cpu: \"10\"\n    requests.memory: 20Gi\n    limits.cpu: \"20\"\n    limits.memory: 40Gi\n    pods: \"50\"\n\n---\napiVersion: v1\nkind: LimitRange\nmetadata:\n  name: production-defaults\n  namespace: production\nspec:\n  limits:\n    - type: Container\n      defaultRequest:\n        cpu: \"100m\"\n        memory: \"128Mi\"\n      default:\n        cpu: \"500m\"\n        memory: \"512Mi\"",
      problems: [
        {
          issue:
            "A Pod is OOMKilled.",
          solution:
            "Inspect memory usage, application logs and container limits. Determine whether the application has a memory leak, workload spike or an undersized limit."
        },
        {
          issue:
            "Pods cannot be scheduled because of insufficient CPU or memory.",
          solution:
            "Check node capacity and requested resources. Review over-sized requests, quotas and workload placement requirements."
        }
      ]
    },

    {
      heading: "12. Docker and Docker Compose Best Practices",
      explanation:
        "Docker configuration should produce images that are reproducible, secure, small enough for efficient delivery and easy to operate. A Dockerfile defines how the image is built. A Compose file defines how multiple containers work together. Use a trusted base image and pin a suitable version. Use a .dockerignore file to keep unnecessary files out of the build context. Multi-stage builds can separate build dependencies from the final runtime image. Run applications as non-root when possible. Avoid placing passwords inside Dockerfiles because image layers and build history may expose them. Store important data in volumes rather than inside a disposable container filesystem. Use healthchecks when they accurately represent service health. Remember that depends_on primarily handles dependency ordering; an application must still tolerate a database becoming unavailable after startup. Use networks to control service communication and publish only the ports that need host access.",
      steps: [
        "Use a small, trusted and maintained base image.",
        "Pin image versions and update them through a controlled process.",
        "Create a .dockerignore file.",
        "Use multi-stage builds when build tools are not required at runtime.",
        "Run the application as a non-root user where supported.",
        "Do not store secrets in Dockerfile instructions.",
        "Use BuildKit secret mounts for build-time credentials where required.",
        "Use named volumes for persistent data.",
        "Publish only necessary ports.",
        "Use explicit Compose service names and networks.",
        "Add accurate healthchecks.",
        "Use application-level retry logic for dependencies.",
        "Review image size and vulnerabilities.",
        "Use docker compose config to validate the resolved Compose file."
      ],
      commands:
        "# Build an image\ndocker build -t devmavox-app:1.0 .\n\n# Inspect image size\ndocker images\n\n# Scan image with an approved scanner when available\ndocker scout quickview devmavox-app:1.0\n\n# Validate Compose configuration\ndocker compose config\n\n# Check running services\ndocker compose ps\n\n# Review logs\ndocker compose logs --tail=100\n\n# Inspect image configuration\ndocker image inspect devmavox-app:1.0",
      config:
        "# Dockerfile example\nFROM node:22-alpine AS build\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:22-alpine AS runtime\nWORKDIR /app\nENV NODE_ENV=production\nCOPY --from=build /app/package*.json ./\nCOPY --from=build /app/node_modules ./node_modules\nCOPY --from=build /app/.next ./.next\nUSER node\nEXPOSE 3000\nCMD [\"npm\", \"start\"]\n\n# .dockerignore\nnode_modules\n.next\n.git\n.env\n.env.*\ncoverage\nnpm-debug.log",
      problems: [
        {
          issue:
            "Docker image size is unnecessarily large.",
          solution:
            "Use a suitable base image, multi-stage builds, dependency pruning and a .dockerignore file. Remove build tools and temporary files from the runtime image where possible."
        },
        {
          issue:
            "A container runs as root unnecessarily.",
          solution:
            "Configure a non-root user in the image and ensure required directories and files have suitable ownership and permissions."
        },
        {
          issue:
            "A Compose application loses database data after container recreation.",
          solution:
            "Use a named persistent volume and verify that it is mounted at the database's actual data directory."
        },
        {
          issue:
            "Backend starts but cannot connect to its database.",
          solution:
            "Use the Compose service name as the hostname, configure a healthcheck and implement connection retries. Do not assume localhost refers to another container."
        }
      ]
    },

    {
      heading: "13. Jenkins Pipeline Best Practices",
      explanation:
        "A Jenkins pipeline should be readable, secure, repeatable and easy to troubleshoot. Keeping pipeline logic in a Jenkinsfile makes it part of the project's version-controlled source. Divide the pipeline into meaningful stages such as checkout, build, test, security scan, package and deploy. Each stage should have a clear responsibility. Avoid placing long, complicated shell scripts directly inside every pipeline stage when they can be maintained as version-controlled scripts or shared libraries. Use Jenkins credentials rather than hardcoded tokens. Set timeouts to prevent jobs from running forever. Avoid uncontrolled concurrent deployments to the same environment. Archive important artifacts and test results. Make sure failed tests cause the pipeline to fail rather than allowing deployment to continue. Separate untrusted branch validation from privileged production deployment. Review agent configuration because a pipeline is only as reliable as the environment executing its commands.",
      steps: [
        "Store the Jenkinsfile in the repository.",
        "Use Declarative Pipeline where it makes the pipeline easier to understand.",
        "Create clear stages for checkout, build, test, scan and deployment.",
        "Use suitable agents with known tool versions.",
        "Use credentials stored in Jenkins rather than hardcoding secrets.",
        "Add timeouts for long-running operations.",
        "Prevent unsafe concurrent deployments where needed.",
        "Publish test results and archive useful artifacts.",
        "Fail the pipeline when critical validation steps fail.",
        "Use shared libraries for common pipeline logic when appropriate.",
        "Separate production deployment permissions from normal CI permissions.",
        "Review console output for accidental secret exposure.",
        "Keep pipeline scripts maintainable and tested."
      ],
      commands:
        "# Check tools on a Jenkins agent\njava -version\nmvn -version\nnode --version\n\n# Run a Maven validation locally on a suitable agent\nmvn clean verify\n\n# Inspect the latest Git revision\ngit rev-parse --short HEAD\n\n# Check workspace contents\npwd\nls -la",
      config:
        "pipeline {\n    agent any\n\n    options {\n        timestamps()\n        timeout(time: 30, unit: 'MINUTES')\n        disableConcurrentBuilds()\n    }\n\n    stages {\n        stage('Checkout') {\n            steps {\n                checkout scm\n            }\n        }\n\n        stage('Build') {\n            steps {\n                sh 'mvn clean package -DskipTests'\n            }\n        }\n\n        stage('Test') {\n            steps {\n                sh 'mvn test'\n            }\n        }\n\n        stage('Package') {\n            steps {\n                archiveArtifacts artifacts: 'target/*.jar', allowEmptyArchive: false\n            }\n        }\n    }\n\n    post {\n        success {\n            echo 'Build and test completed successfully.'\n        }\n        failure {\n            echo 'Pipeline failed. Review the failed stage.'\n        }\n        always {\n            echo 'Pipeline execution finished.'\n        }\n    }\n}",
      problems: [
        {
          issue:
            "Jenkins jobs run for hours without completing.",
          solution:
            "Set stage or pipeline timeouts, inspect stuck processes and verify external dependencies. Cancel or terminate stuck work only after understanding the impact."
        },
        {
          issue:
            "Production deployment runs while another deployment is still in progress.",
          solution:
            "Use controlled concurrency, deployment locks or environment-specific pipeline controls. Prevent multiple releases from modifying the same environment simultaneously."
        },
        {
          issue:
            "A Jenkins pipeline continues even after an important test fails.",
          solution:
            "Check shell exit-code handling and pipeline conditions. Ensure critical test stages return a failure status and block deployment."
        }
      ]
    },

    {
      heading: "14. GitHub Actions Best Practices",
      explanation:
        "GitHub Actions workflows should be designed with reliability and security in mind. A workflow is triggered by an event, so choose events and branch filters carefully. Avoid running privileged deployment jobs for untrusted code. Define token permissions explicitly instead of relying on broad defaults. Keep jobs focused and use caching to reduce unnecessary dependency downloads. Use artifacts to transfer build outputs between jobs when appropriate. Avoid putting secrets directly into workflow YAML. Pin third-party actions to verified versions or commit SHAs according to your security policy. Use concurrency controls to prevent outdated or overlapping deployments. Keep workflow names and job names meaningful so that developers can understand the result from the Actions page. A workflow should fail clearly when a required step fails. Do not ignore test or security failures merely to make a green check mark appear.",
      steps: [
        "Store workflows in .github/workflows.",
        "Use clear workflow and job names.",
        "Choose only the events that should trigger each workflow.",
        "Use branch filters to control execution where required.",
        "Set minimum required GITHUB_TOKEN permissions.",
        "Pin third-party actions to trusted versions or verified commit SHAs.",
        "Use dependency caching appropriately.",
        "Use artifacts for passing build outputs between jobs.",
        "Use secrets only in trusted jobs that need them.",
        "Use protected environments for production deployment.",
        "Use concurrency controls for deployment jobs.",
        "Avoid exposing privileged credentials to untrusted pull requests.",
        "Review job logs after failed runs.",
        "Keep workflows reusable where a common process is shared."
      ],
      commands:
        "# Check tracked GitHub Actions workflows\ngit ls-files .github/workflows\n\n# Review workflow modifications\ngit diff -- .github/workflows/\n\n# Validate workflow YAML with an appropriate YAML linter\nyamllint .github/workflows/\n\n# Check current repository status\ngit status",
      config:
        "name: DevMavox CI\n\non:\n  pull_request:\n    branches: [main]\n  push:\n    branches: [main]\n\npermissions:\n  contents: read\n\nconcurrency:\n  group: ci-${{ github.workflow }}-${{ github.ref }}\n  cancel-in-progress: true\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout\n        uses: actions/checkout@v4\n\n      - name: Set up Node.js\n        uses: actions/setup-node@v4\n        with:\n          node-version: 22\n          cache: npm\n\n      - name: Install dependencies\n        run: npm ci\n\n      - name: Run tests\n        run: npm test --if-present\n\n      - name: Build\n        run: npm run build",
      problems: [
        {
          issue:
            "GitHub Actions token has more permissions than the workflow needs.",
          solution:
            "Add an explicit permissions block at workflow or job level and grant only the required scopes."
        },
        {
          issue:
            "An old deployment starts after a newer deployment has already completed.",
          solution:
            "Use concurrency controls and an appropriate deployment strategy so outdated runs cannot unexpectedly overwrite the current release."
        },
        {
          issue:
            "A workflow cannot access secrets from a pull request.",
          solution:
            "Check whether the event is from a fork or untrusted context. Do not weaken security simply to expose production secrets; separate untrusted validation from privileged deployment."
        }
      ]
    },

    {
      heading: "15. Terraform Best Practices – Safe Infrastructure Changes",
      explanation:
        "Terraform manages real infrastructure, so configuration mistakes can have financial and operational consequences. A Terraform resource may create a cloud server, change network access, replace a database or destroy storage. Therefore, do not treat terraform apply as an ordinary command that can be run without review. Use a clear project structure, provider version constraints, input variables, locals and outputs. Run terraform fmt and terraform validate before planning. Review the plan carefully to understand whether resources will be created, changed or destroyed. Use remote state with locking for team environments. Protect state and plan files because they may contain sensitive information. Use modules for reusable infrastructure patterns. Avoid changing resource identities without understanding state implications. Apply infrastructure changes through controlled identities and approval processes.",
      steps: [
        "Declare Terraform and provider version requirements.",
        "Use variables instead of hardcoding environment-specific values.",
        "Use locals for repeated expressions and common tags.",
        "Use outputs for values that operators or other modules need.",
        "Use modules for reusable infrastructure components.",
        "Run terraform fmt before committing changes.",
        "Run terraform validate to check configuration structure.",
        "Run terraform plan and inspect every proposed change.",
        "Treat unexpected resource destruction as a reason to stop and investigate.",
        "Use remote state with locking for team collaboration.",
        "Restrict backend access because state may contain sensitive data.",
        "Avoid committing .terraform directories, state files, plans and secret variable files.",
        "Use controlled infrastructure deployment identities.",
        "Review cost, availability and security impact before applying changes.",
        "Keep a documented recovery and state backup procedure."
      ],
      commands:
        "# Format Terraform configuration\nterraform fmt -recursive\n\n# Validate the configuration\nterraform validate\n\n# Initialize providers and backend\nterraform init\n\n# Create a plan for review\nterraform plan -out=tfplan\n\n# Inspect the saved plan\nterraform show tfplan\n\n# Apply only after reviewing the plan\nterraform apply tfplan\n\n# List resources tracked in state\nterraform state list",
      config:
        "# versions.tf\nterraform {\n  required_version = \">= 1.6.0, < 2.0.0\"\n\n  required_providers {\n    aws = {\n      source  = \"hashicorp/aws\"\n      version = \"~> 5.0\"\n    }\n  }\n}\n\n# variables.tf\nvariable \"environment\" {\n  description = \"Target deployment environment\"\n  type        = string\n}\n\n# main.tf\nlocals {\n  common_tags = {\n    Project     = \"devmavox\"\n    Environment = var.environment\n    ManagedBy   = \"Terraform\"\n  }\n}\n\n# outputs.tf\noutput \"environment\" {\n  value = var.environment\n}",
      problems: [
        {
          issue:
            "Terraform plan proposes destroying an important production resource.",
          solution:
            "Do not apply. Review configuration, state, provider versions, resource identity and lifecycle changes. Confirm the intended change with the responsible infrastructure owner."
        },
        {
          issue:
            "Terraform state is shared manually between team members.",
          solution:
            "Move to a supported remote backend with locking, controlled permissions, encryption and versioning."
        },
        {
          issue:
            "An infrastructure update creates unexpectedly expensive resources.",
          solution:
            "Review instance types, storage, data transfer, availability zones and resource counts in the plan. Use budget and policy checks before approval."
        }
      ]
    },

    {
      heading: "16. Terraform State, Locking and Backup Best Practices",
      explanation:
        "Terraform state is a critical record that connects configuration to actual infrastructure. If state is lost, corrupted or overwritten, Terraform may no longer know which resources it manages. If multiple engineers modify the same state at the same time without locking, their operations can conflict. Use a supported remote backend for shared infrastructure. Configure state locking where the backend supports it. Protect state with encryption, access control and backups or versioning. Do not store state in a public repository or share it through ordinary email. State may contain sensitive attributes even when they are not shown in normal terminal output. Before state migrations or manual state operations, create a secure backup and follow a documented recovery process. Never force-unlock a state merely because a command appears stuck; first confirm that the original operation has stopped.",
      steps: [
        "Choose a supported remote backend for shared infrastructure.",
        "Enable encryption and appropriate access controls.",
        "Configure state locking where supported.",
        "Enable backend versioning or another recovery mechanism.",
        "Restrict access to only authorized infrastructure operators.",
        "Back up state securely before planned state operations.",
        "Do not manually edit the state file.",
        "Do not force-unlock until the original operation is confirmed to be inactive.",
        "Do not commit state or plan files to Git.",
        "Test the recovery process before relying on it during an incident."
      ],
      commands:
        "# List resources tracked by Terraform\nterraform state list\n\n# Pull current state for a controlled backup operation\n# Store the backup securely; it may contain sensitive information.\nterraform state pull > terraform-state-backup.json\n\n# Initialize a backend\nterraform init\n\n# Migrate state when intentionally changing backends\nterraform init -migrate-state\n\n# Reconfigure backend settings only when required\nterraform init -reconfigure",
      config:
        "# Example S3 backend\nterraform {\n  backend \"s3\" {\n    bucket       = \"replace-with-secure-state-bucket\"\n    key          = \"devmavox/production/terraform.tfstate\"\n    region       = \"ap-south-1\"\n    encrypt      = true\n    use_lockfile = true\n  }\n}\n\n# Protect local Terraform files with .gitignore\n.terraform/\n*.tfstate\n*.tfstate.*\n*.tfplan\n*.tfplan.*\n*.tfvars\n*.tfvars.json",
      problems: [
        {
          issue:
            "Terraform reports that the state is locked.",
          solution:
            "Identify the operation holding the lock. Allow it to complete where possible. Force-unlock only after verifying that no active operation is using the state."
        },
        {
          issue:
            "Terraform state was deleted or corrupted.",
          solution:
            "Stop infrastructure changes. Recover from a secure backend version or backup and verify resource mappings before running a new plan."
        },
        {
          issue:
            "An engineer cannot access the remote backend.",
          solution:
            "Check backend credentials, IAM permissions, bucket or storage access, network connectivity and encryption configuration."
        }
      ]
    },

    {
      heading: "17. Configuration Validation and Automated Quality Checks",
      explanation:
        "Configuration validation should happen before a file reaches production. The first level is syntax validation, which checks whether the file can be parsed. The second level is tool-specific validation, which checks whether the fields and values are accepted by the target platform. The third level is policy and security validation, which checks whether the configuration follows organizational rules. The fourth level is runtime testing, which checks whether the application behaves correctly after deployment. For example, yamllint can identify YAML style and syntax problems, but it cannot guarantee that a Kubernetes Service selects the correct Pods. kubectl can validate Kubernetes resources against the API server, but it cannot guarantee that the application itself is healthy. Terraform validate does not tell you whether a cloud change is safe or affordable. Every validation tool has a specific purpose. Use multiple checks where they add real value.",
      steps: [
        "Run a YAML linter to identify formatting and syntax problems.",
        "Run Docker Compose config to validate the resolved Compose configuration.",
        "Use Kubernetes client-side or server-side dry-run validation.",
        "Run Terraform fmt and validate.",
        "Generate and review a Terraform plan.",
        "Validate GitHub Actions workflows using suitable linting and platform checks.",
        "Validate Jenkins pipelines using approved Jenkins pipeline tooling or a test instance.",
        "Run security and policy checks where required.",
        "Run application tests after configuration is applied in a safe environment.",
        "Make validation part of CI/CD so that common mistakes are caught automatically.",
        "Treat warnings and failed policy checks according to the project's risk policy."
      ],
      commands:
        "# YAML validation\nyamllint .\n\n# Docker Compose validation\ndocker compose config --quiet\n\n# Kubernetes validation\nkubectl apply --dry-run=client -f kubernetes/\nkubectl apply --dry-run=server -f kubernetes/\n\n# Terraform validation\nterraform fmt -check -recursive\nterraform validate\nterraform plan\n\n# Git review\ngit diff --check\ngit status",
      config:
        "name: Configuration Quality Checks\n\non:\n  pull_request:\n\npermissions:\n  contents: read\n\njobs:\n  validate:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout\n        uses: actions/checkout@v4\n\n      - name: Check whitespace errors\n        run: git diff --check\n\n      - name: Install YAML linter\n        run: python -m pip install yamllint\n\n      - name: Validate YAML\n        run: yamllint .github/workflows/\n\n      - name: Validate Terraform\n        working-directory: infrastructure\n        run: |\n          terraform fmt -check -recursive\n          terraform init -backend=false\n          terraform validate",
      problems: [
        {
          issue:
            "A YAML file passes linting but Kubernetes rejects it.",
          solution:
            "Use Kubernetes API validation. A general YAML linter checks YAML structure and style, not Kubernetes resource semantics."
        },
        {
          issue:
            "Terraform validate succeeds but the planned change is unsafe.",
          solution:
            "Review terraform plan and use policy, security and cost checks where appropriate. Syntax validation does not prove that a real infrastructure change is safe."
        },
        {
          issue:
            "Validation works locally but fails in CI.",
          solution:
            "Compare tool versions, environment variables, dependencies, file paths and permissions. Make the CI environment reproducible."
        }
      ]
    },

    {
      heading: "18. Configuration Version Control and Code Review",
      explanation:
        "Configuration files should be stored in version control because they are part of the system's operational definition. Git provides history, collaboration, branching and the ability to review changes. When a production issue begins after a configuration update, engineers can inspect the commit history and identify what changed. Pull requests provide a place to discuss the purpose and impact of a change before merging it. A good configuration pull request should explain what is changing, why the change is required, which environments are affected, how it was validated and how it can be rolled back. Avoid committing generated state, temporary plans, credentials and local environment files. Use branch protection and required checks for important repositories. Do not merge a risky infrastructure change simply because the YAML parser reports no errors.",
      steps: [
        "Store configuration files in the correct project repository.",
        "Create a separate branch for each meaningful change.",
        "Keep commits focused and describe their purpose.",
        "Review the diff before committing.",
        "Use pull requests for important shared configuration changes.",
        "Require appropriate reviewers for production infrastructure changes.",
        "Run automated validation before merging.",
        "Do not commit secrets, state files or local generated artifacts.",
        "Document the affected environments and deployment plan.",
        "Keep a rollback plan for changes that can affect production."
      ],
      commands:
        "# Check current changes\ngit status\n\n# Review the complete diff\ngit diff\n\n# Create a branch\ngit switch -c update-production-config\n\n# Stage only the intended files\ngit add kubernetes/deployment.yaml\n\n# Commit the change\ngit commit -m \"Update application deployment configuration\"\n\n# Push the branch\ngit push -u origin update-production-config",
      config:
        "# Example pull request description\n\n## Purpose\nExplain why the configuration change is required.\n\n## Changes\n- Describe the resources or settings changed.\n- Mention affected environments.\n\n## Validation\n- YAML validation completed.\n- Kubernetes dry-run completed.\n- Staging test completed.\n\n## Risk\nExplain possible service, security or infrastructure impact.\n\n## Rollback\nExplain how to restore the previous approved configuration.",
      problems: [
        {
          issue:
            "A developer commits unrelated local configuration files.",
          solution:
            "Review git status and git diff before staging. Add only the intended files and maintain a suitable .gitignore."
        },
        {
          issue:
            "A production configuration change is merged without review.",
          solution:
            "Use branch protection and required reviewers or checks for sensitive repositories and deployment paths."
        },
        {
          issue:
            "The team cannot identify which change introduced an outage.",
          solution:
            "Maintain focused commits, pull request descriptions and deployment records. Record the commit and artifact version used by each release."
        }
      ]
    },

    {
      heading: "19. Configuration Drift Detection and Reconciliation",
      explanation:
        "Configuration drift happens when the actual running environment becomes different from the intended configuration. For example, an engineer may manually change a cloud security group in the console, or someone may edit a Kubernetes resource directly without updating its source-controlled manifest. After some time, the running system no longer matches the reviewed configuration. Drift makes it difficult to know which values are correct and whether a future deployment will overwrite an emergency change. Infrastructure as Code tools such as Terraform can identify differences between configuration, state and remote infrastructure during planning. Kubernetes controllers continuously reconcile many managed resources towards their declared desired state, but manual changes and unmanaged objects can still create operational confusion. Teams should define which system is the source of truth and avoid uncontrolled manual changes. Emergency changes should be recorded and brought back into the approved configuration after the incident.",
      steps: [
        "Define the source of truth for each infrastructure and application setting.",
        "Avoid manual changes to managed resources unless following an approved emergency process.",
        "Run regular Terraform plans to identify infrastructure drift.",
        "Compare live Kubernetes resources with their approved manifests.",
        "Record emergency manual changes.",
        "Update source-controlled configuration after approved emergency fixes.",
        "Review unexplained differences before applying corrective changes.",
        "Use policy and monitoring tools to identify unauthorized changes.",
        "Avoid blindly overwriting a working emergency fix before understanding why it was made."
      ],
      commands:
        "# Detect Terraform differences through a plan\nterraform plan\n\n# Inspect live Kubernetes Deployment configuration\nkubectl get deployment devmavox-app -n production -o yaml\n\n# Compare a local manifest with the live resource\nkubectl diff -f deployment.yaml\n\n# Review Git changes\ngit diff",
      config:
        "# Keep the desired state in Git.\n# Example approved Kubernetes Deployment values:\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: devmavox-app\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: devmavox\n  template:\n    metadata:\n      labels:\n        app: devmavox\n    spec:\n      containers:\n        - name: app\n          image: registry.example.com/devmavox/app:approved-version",
      problems: [
        {
          issue:
            "Terraform repeatedly proposes changes that nobody expected.",
          solution:
            "Inspect the planned difference, provider behavior, manually changed cloud settings and state. Confirm the intended source of truth before applying."
        },
        {
          issue:
            "Kubernetes live configuration does not match the manifest in Git.",
          solution:
            "Use kubectl diff and inspect managed fields and ownership. Determine whether the difference is intentional, controller-managed or an unauthorized manual change."
        }
      ]
    },

    {
      heading: "20. Health Checks, Readiness and Reliability",
      explanation:
        "A process running successfully does not always mean an application is ready to serve users. It may still be loading data, connecting to a database or performing startup tasks. Health checks help systems understand application condition. In Kubernetes, readiness probes determine whether a container should receive normal Service traffic. Liveness probes detect situations where a container should be restarted. Startup probes protect applications that need more time to initialize. In Docker Compose, healthchecks can provide a health status for services and can be used with supported dependency conditions. Health checks should test a meaningful condition without being too expensive or too aggressive. A liveness endpoint should not restart a healthy application simply because a temporary external service is slow. Readiness and liveness should be designed according to the application's actual behavior.",
      steps: [
        "Define what healthy, ready and started mean for the application.",
        "Create suitable health endpoints where the application supports them.",
        "Use readiness checks to control when traffic can reach the application.",
        "Use liveness checks to identify processes that cannot recover normally.",
        "Use startup checks for applications with long initialization times.",
        "Choose suitable timeouts and failure thresholds.",
        "Avoid making liveness depend on every external service.",
        "Test probe behavior during slow startup and temporary dependency failures.",
        "Monitor restart counts and readiness transitions.",
        "Review health checks after significant application changes."
      ],
      commands:
        "# Inspect Kubernetes Pod health and restart information\nkubectl get pods -n production\n\n# Inspect probe failures and events\nkubectl describe pod <pod-name> -n production\n\n# Check application logs\nkubectl logs <pod-name> -n production\n\n# Inspect Docker Compose health status\ndocker compose ps\n\n# Review health-related service logs\ndocker compose logs --tail=100",
      config:
        "startupProbe:\n  httpGet:\n    path: /health/startup\n    port: 3000\n  periodSeconds: 5\n  failureThreshold: 30\n\nreadinessProbe:\n  httpGet:\n    path: /health/ready\n    port: 3000\n  periodSeconds: 10\n  timeoutSeconds: 2\n  failureThreshold: 3\n\nlivenessProbe:\n  httpGet:\n    path: /health/live\n    port: 3000\n  periodSeconds: 20\n  timeoutSeconds: 2\n  failureThreshold: 3",
      problems: [
        {
          issue:
            "Kubernetes repeatedly restarts an application during normal startup.",
          solution:
            "Use a startup probe where appropriate and adjust probe timing based on measured startup duration. Confirm that the endpoint returns the expected response."
        },
        {
          issue:
            "Application receives traffic before it can serve requests.",
          solution:
            "Configure a readiness probe that checks the application's actual readiness. Verify that the Service selects only ready Pods."
        },
        {
          issue:
            "Temporary database latency causes the application to restart continuously.",
          solution:
            "Separate readiness and liveness responsibilities. Use suitable application retry behavior and avoid making liveness fail for every temporary external dependency issue."
        }
      ]
    },

    {
      heading: "21. Logging, Monitoring and Observability Configuration",
      explanation:
        "Configuration best practices must include observability. Observability means understanding what is happening inside a system by examining logs, metrics and traces. Logs describe events, metrics show numerical behavior over time and traces help follow a request across multiple services. A service may be running but still experience slow response times, high error rates or resource pressure. Without monitoring, these issues may remain hidden until users complain. Configure applications to write useful logs, preferably in a structured format. Include timestamps, severity, service name and request or correlation identifiers where appropriate. Avoid logging passwords, tokens, personal data or other sensitive values. Define metrics for important application and infrastructure behavior. Use alerts that indicate actionable problems rather than generating unnecessary noise. Keep retention and access policies suitable for the data being collected.",
      steps: [
        "Choose a consistent logging format.",
        "Include useful timestamps and severity levels.",
        "Include service and environment identifiers.",
        "Use correlation IDs to connect related requests across services.",
        "Never log passwords, tokens or confidential data.",
        "Collect application and infrastructure metrics.",
        "Monitor latency, error rate, traffic and saturation.",
        "Create alerts for actionable failure conditions.",
        "Set log retention according to operational and compliance needs.",
        "Restrict access to logs that contain sensitive information.",
        "Test alert delivery and incident response procedures."
      ],
      commands:
        "# Follow Kubernetes application logs\nkubectl logs -f deployment/devmavox-app -n production\n\n# Check resource usage\nkubectl top pods -n production\n\n# Inspect container logs\n docker compose logs -f backend\n\n# Check running Compose services\ndocker compose ps",
      config:
        "# Example structured application log\n{\n  \"timestamp\": \"2026-10-31T10:00:00Z\",\n  \"level\": \"INFO\",\n  \"service\": \"devmavox-api\",\n  \"environment\": \"production\",\n  \"message\": \"Request completed\",\n  \"request_id\": \"example-request-id\",\n  \"status_code\": 200,\n  \"duration_ms\": 42\n}\n\n# Do not include passwords, access tokens or private keys in log fields.",
      problems: [
        {
          issue:
            "Application logs are not enough to identify the failing request.",
          solution:
            "Add structured fields such as request IDs, service name, timestamps and severity. Correlate logs with traces and metrics."
        },
        {
          issue:
            "Logs contain sensitive user or credential information.",
          solution:
            "Remove sensitive fields, restrict access, rotate exposed credentials where necessary and apply appropriate retention and data-handling policies."
        },
        {
          issue:
            "Monitoring alerts are generated continuously without useful action.",
          solution:
            "Review alert thresholds, group related alerts, remove duplicate conditions and alert on user-impacting symptoms or actionable infrastructure conditions."
        }
      ]
    },

    {
      heading: "22. Network and Port Configuration Best Practices",
      explanation:
        "Networking configuration determines how applications communicate with users, databases, external APIs and other services. Every service should expose only the ports it actually needs. A container's internal port and the host port may be different. Kubernetes Service port and targetPort also have different purposes. Security groups, firewall rules, NetworkPolicies and load balancers control access at different layers. Do not assume that publishing a port makes an application secure. Do not expose internal databases or management interfaces to the public internet unless there is a specific, approved requirement. Use TLS for sensitive traffic and verify certificates correctly. For service-to-service communication, prefer stable DNS names and documented endpoints rather than hardcoded IP addresses. Keep network access limited to required sources and destinations.",
      steps: [
        "Identify which components need to communicate.",
        "Document the required source, destination, protocol and port.",
        "Expose only necessary application ports.",
        "Keep databases and internal services private where possible.",
        "Use Kubernetes Services for stable in-cluster endpoints.",
        "Use NetworkPolicies when supported by the cluster networking implementation.",
        "Use cloud firewall and security group rules with restricted source ranges.",
        "Use TLS for sensitive external and internal communication where required.",
        "Avoid hardcoding changing service IP addresses.",
        "Test connectivity from the actual source workload.",
        "Review public exposure whenever a Service or load balancer is changed."
      ],
      commands:
        "# Check listening ports on a Linux machine\nss -tulpen\n\n# Check Kubernetes Services\nkubectl get services -A\n\n# Inspect a specific Service\nkubectl describe service devmavox-service -n production\n\n# Test HTTP connectivity from an authorized client\ncurl -I https://example.com\n\n# Inspect firewall rules using the platform's approved tools.",
      config:
        "# Example Kubernetes NetworkPolicy\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: allow-frontend-to-backend\n  namespace: production\nspec:\n  podSelector:\n    matchLabels:\n      app: backend\n  policyTypes:\n    - Ingress\n  ingress:\n    - from:\n        - podSelector:\n            matchLabels:\n              app: frontend\n      ports:\n        - protocol: TCP\n          port: 3000",
      problems: [
        {
          issue:
            "A service is publicly accessible even though it should be internal.",
          solution:
            "Review the Service type, load balancer, ingress and cloud firewall configuration. Remove unnecessary public exposure and restrict access."
        },
        {
          issue:
            "Two services cannot communicate despite both Pods running.",
          solution:
            "Check Service selectors, target ports, DNS, NetworkPolicies, firewall rules and whether the application listens on the expected interface."
        },
        {
          issue:
            "The application uses localhost to connect to another container.",
          solution:
            "Use the service DNS name or approved network endpoint. Inside a container, localhost refers to that container's own network namespace."
        }
      ]
    },

    {
      heading: "23. Storage, Volumes and Data Protection Best Practices",
      explanation:
        "Containers and Pods are replaceable units. Their local writable filesystem should not be treated as permanent storage for important business data. When a container is removed or a Pod is rescheduled, data stored only in its temporary filesystem may be lost. Use the correct storage mechanism for the data type. Docker named volumes are useful for persistent data in Compose environments. Kubernetes PersistentVolumes and PersistentVolumeClaims provide storage abstraction for workloads. Cloud databases and managed storage services may be more appropriate than running stateful databases inside application containers. Storage performance, backup frequency, encryption, retention and recovery time should be planned. A successful backup is not enough; teams must test restoration. Never delete volumes or storage resources during cleanup without confirming the impact.",
      steps: [
        "Identify which application data must survive container replacement.",
        "Use temporary storage only for disposable data.",
        "Use named Docker volumes for suitable Compose workloads.",
        "Use Kubernetes PVCs for workloads requiring persistent volumes.",
        "Choose storage classes based on performance and availability needs.",
        "Enable encryption where required.",
        "Set backup schedules and retention policies.",
        "Test restore procedures regularly.",
        "Restrict access to backup data.",
        "Review destructive commands before running them.",
        "Document recovery objectives and storage dependencies."
      ],
      commands:
        "# List Docker volumes\ndocker volume ls\n\n# Inspect a named Docker volume\ndocker volume inspect postgres-data\n\n# List Kubernetes PersistentVolumeClaims\nkubectl get pvc -A\n\n# Inspect a PVC\nkubectl describe pvc <claim-name> -n production\n\n# List Kubernetes PersistentVolumes\nkubectl get pv",
      config:
        "# Docker Compose persistent volume\nservices:\n  database:\n    image: postgres:16\n    volumes:\n      - database-data:/var/lib/postgresql/data\n\nvolumes:\n  database-data:\n\n---\n# Kubernetes PVC example\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: database-storage\n  namespace: production\nspec:\n  accessModes:\n    - ReadWriteOnce\n  resources:\n    requests:\n      storage: 20Gi",
      problems: [
        {
          issue:
            "Database records disappear after a container is recreated.",
          solution:
            "Check whether a persistent volume is mounted at the correct database data directory. Verify that the application is writing to the mounted path."
        },
        {
          issue:
            "A PVC remains Pending.",
          solution:
            "Check available StorageClasses, capacity, access modes, volume provisioning events and cluster storage permissions."
        },
        {
          issue:
            "A backup exists but restoration fails.",
          solution:
            "Test backup integrity and restore procedures regularly. Verify database version compatibility, required credentials, storage capacity and recovery steps."
        }
      ]
    },

    {
      heading: "24. Configuration Documentation and Comments",
      explanation:
        "Configuration should be understandable without depending on the original author. Comments are useful when a value or design decision is not obvious. For example, a comment may explain why a readiness probe has a particular timeout or why a Terraform resource uses a specific lifecycle setting. However, comments should not repeat every field in the configuration. A comment such as replicas means number of Pods adds little value. A better comment explains the reason behind a non-obvious choice. Keep documentation close to the configuration or in a clearly linked project guide. Document required environment variables, secret names without secret values, deployment dependencies, validation commands and rollback steps. Update documentation when behavior changes. Incorrect documentation is often worse than missing documentation because it leads engineers to follow outdated instructions.",
      steps: [
        "Explain why important configuration choices were made.",
        "Document non-obvious values and dependencies.",
        "Avoid comments that simply repeat field names.",
        "Provide safe examples without real secrets.",
        "Document required tools and versions.",
        "Document environment-specific requirements.",
        "Include validation and deployment commands.",
        "Explain rollback and recovery steps.",
        "Keep documentation updated with configuration changes.",
        "Use clear language that a new team member can understand."
      ],
      config:
        "# Kubernetes example\nspec:\n  replicas: 3\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      # Keep at least the configured available capacity during a rollout.\n      maxUnavailable: 0\n      maxSurge: 1\n\n# Terraform example\nvariable \"environment\" {\n  description = \"Environment used for naming and resource tagging\"\n  type        = string\n}",
      problems: [
        {
          issue:
            "Comments describe values that no longer match the configuration.",
          solution:
            "Review comments during code review and update them whenever related configuration changes."
        },
        {
          issue:
            "New engineers do not know how to deploy or validate the project.",
          solution:
            "Provide a configuration guide with prerequisites, commands, required environment values, deployment sequence and rollback instructions."
        }
      ]
    },

    {
      heading: "25. Configuration Changes, Rollback and Disaster Recovery",
      explanation:
        "Every production configuration change should have a recovery plan. Even after validation and review, a change may behave differently under real traffic. Rollback means returning to a previously known good application or configuration state. The rollback method depends on the tool. Kubernetes Deployments maintain rollout history and can roll back to a previous revision when that revision is still available. Docker deployments may use a previous immutable image. Git provides the history needed to identify and restore approved configuration. Terraform is different: blindly reverting a Terraform file and applying it may destroy or recreate resources. Infrastructure rollback must be planned according to the resource's lifecycle and data impact. Database migrations, storage changes and irreversible operations need special treatment. A good recovery plan identifies the previous version, the responsible engineer, validation steps and the conditions under which rollback should happen.",
      steps: [
        "Identify the risk and expected impact before deployment.",
        "Record the currently deployed application version.",
        "Keep the previous approved configuration or artifact available.",
        "Define success conditions and failure conditions.",
        "Use controlled rollout strategies where supported.",
        "Monitor application health after deployment.",
        "Stop further rollout when serious failures appear.",
        "Use the tool-specific rollback method.",
        "Do not assume Terraform changes can always be reversed safely.",
        "Check data and database compatibility before rolling back application code.",
        "Verify service health after recovery.",
        "Document the incident and preventive actions."
      ],
      commands:
        "# Kubernetes rollout history\nkubectl rollout history deployment/devmavox-app -n production\n\n# Roll back a Kubernetes Deployment\nkubectl rollout undo deployment/devmavox-app -n production\n\n# Check rollback status\nkubectl rollout status deployment/devmavox-app -n production\n\n# Review the Git configuration history\ngit log --oneline -- kubernetes/\n\n# Review a specific commit\ngit show <commit-id>\n\n# Terraform: create and inspect a new plan after any configuration correction\nterraform plan",
      config:
        "# Example release record\napplication: devmavox-app\nenvironment: production\ncurrent_version: \"1.5.0\"\nprevious_version: \"1.4.3\"\nsource_commit: \"REPLACE_WITH_COMMIT_ID\"\nimage_digest: \"REPLACE_WITH_VERIFIED_DIGEST\"\nrollback_owner: \"platform-team\"\nhealth_checks:\n  - application-readiness\n  - error-rate\n  - response-latency",
      problems: [
        {
          issue:
            "A new Kubernetes release causes errors for users.",
          solution:
            "Inspect rollout status, logs, events and metrics. If the previous revision is known to be healthy and rollback is safe, use the approved rollback procedure and verify recovery."
        },
        {
          issue:
            "A Terraform file is reverted but applying it would destroy an important resource.",
          solution:
            "Do not apply blindly. Review the plan, state, lifecycle and resource dependencies. Determine whether a forward fix or controlled migration is safer."
        },
        {
          issue:
            "Application rollback breaks because the database schema was changed.",
          solution:
            "Design backward-compatible database migrations where possible. Test application and schema compatibility and define a separate database recovery strategy."
        }
      ]
    },

    {
      heading: "26. Cost Optimization in Configuration",
      explanation:
        "Configuration decisions can directly affect cloud spending. Too many replicas, oversized instances, unnecessary storage, excessive log retention and unneeded load balancers can increase monthly costs. At the same time, reducing resources too aggressively can cause poor performance and outages. Cost optimization should balance cost, reliability and performance. Use resource requests based on measured workload behavior. Choose suitable cloud instance types and storage classes. Remove unused resources through a controlled process. Apply lifecycle and retention policies where appropriate. Use tags to identify ownership, environment and project. Monitor actual usage and compare it with the expected workload. Never delete production resources simply because they appear unused without checking dependencies and business ownership.",
      steps: [
        "Tag resources with project, environment and ownership.",
        "Measure CPU, memory, storage and network usage.",
        "Choose appropriate instance and storage sizes.",
        "Avoid unnecessary replicas and oversized resource requests.",
        "Review unused load balancers, disks, snapshots and addresses.",
        "Use storage lifecycle policies where suitable.",
        "Set log retention based on operational and compliance needs.",
        "Review Terraform plans for unexpected resource creation.",
        "Use budget alerts and cost monitoring.",
        "Get approval before removing resources that may have hidden dependencies."
      ],
      commands:
        "# Inspect Kubernetes resource usage\nkubectl top nodes\nkubectl top pods -A\n\n# Inspect Terraform planned changes\nterraform plan\n\n# List Docker images and their sizes\ndocker images\n\n# List Docker volumes\ndocker volume ls\n\n# Review cloud cost and usage through the approved cloud billing tools.",
      config:
        "# Example Terraform tags\nlocals {\n  common_tags = {\n    Project     = \"devmavox\"\n    Environment = var.environment\n    Owner       = \"platform-team\"\n    ManagedBy   = \"Terraform\"\n  }\n}\n\n# Apply tags consistently to supported cloud resources.\n# Use actual measured workload requirements when setting capacity.",
      problems: [
        {
          issue:
            "Cloud bills increase after a deployment.",
          solution:
            "Review resource counts, instance sizes, storage, data transfer, logging and load balancers. Compare current usage with the previous period and identify which configuration change caused the increase."
        },
        {
          issue:
            "Resources are reduced and application performance becomes poor.",
          solution:
            "Review traffic patterns, CPU and memory utilization, latency and error rates. Restore suitable capacity and optimize using measured data rather than arbitrary limits."
        }
      ]
    },

    {
      heading: "27. Configuration Security Scanning and Supply Chain Protection",
      explanation:
        "Configuration files can create security weaknesses even when the application code is secure. A Kubernetes manifest may grant excessive privileges. A Dockerfile may run as root. A Terraform resource may expose a storage bucket publicly. A GitHub Actions workflow may grant broad token permissions. A Jenkins pipeline may expose credentials. Security scanning helps identify these problems before deployment. Use appropriate tools to scan infrastructure configuration, container images, dependencies and workflow files. Treat scanner output as information that must be reviewed in context. Fix high-risk findings according to policy and document accepted exceptions. Keep third-party actions, providers and base images trusted and updated. Protect the build process because an attacker who can modify a pipeline may be able to influence the software delivered to production.",
      steps: [
        "Identify the configuration and artifact types used by the project.",
        "Select scanners that support those technologies.",
        "Scan Terraform and Kubernetes manifests for risky settings.",
        "Scan container images for known vulnerabilities.",
        "Review application dependency vulnerabilities.",
        "Use least-privilege CI/CD permissions.",
        "Pin trusted third-party dependencies according to policy.",
        "Protect repository branches and deployment environments.",
        "Store scanner results with the relevant build or pull request.",
        "Prioritize findings based on severity and actual exposure.",
        "Document exceptions and assign an owner for remediation."
      ],
      commands:
        "# Example Terraform security scan with Checkov when installed\ncheckov -d infrastructure/\n\n# Example container image scan with Trivy when installed\ntrivy image devmavox-app:1.0\n\n# Example filesystem scan with Trivy when installed\ntrivy fs .\n\n# Review GitHub Actions workflow permissions\n# Inspect .github/workflows/*.yml\n\n# Review Kubernetes security configuration\nkubectl get pods -n production -o wide",
      config:
        "# Example secure container settings\nsecurityContext:\n  runAsNonRoot: true\n  allowPrivilegeEscalation: false\n  capabilities:\n    drop:\n      - ALL\n\n# Example GitHub Actions minimal permissions\npermissions:\n  contents: read\n\n# Apply only the permissions required by each job.",
      problems: [
        {
          issue:
            "A scanner reports a critical vulnerability in a base image.",
          solution:
            "Check whether a fixed image version is available, update the base image through a tested change, rebuild the artifact and verify the scanner result."
        },
        {
          issue:
            "A Terraform configuration exposes a resource publicly.",
          solution:
            "Check the resource's access policy and business requirement. Restrict access, review dependencies and confirm that the new policy does not break required application access."
        },
        {
          issue:
            "Security scans produce many findings and developers ignore them.",
          solution:
            "Prioritize findings by severity and exploitability, establish clear ownership and add actionable checks to the pull-request process."
        }
      ]
    },

    {
      heading: "28. Reusable Templates, Modules and Shared Configuration",
      explanation:
        "Reusable configuration reduces duplication and makes maintenance easier when several applications or environments follow the same pattern. Terraform modules can provide reusable infrastructure components. Helm charts can package Kubernetes resources with configurable values. Kustomize can organize Kubernetes base manifests and environment overlays. Jenkins shared libraries can provide common pipeline functions. GitHub Actions reusable workflows can centralize repeated CI/CD processes. Reuse should not hide important behavior. A reusable component needs clear inputs, outputs, versioning and documentation. When updating a shared component, understand which projects depend on it. Test the change before promoting it. Do not introduce a complicated abstraction for a configuration pattern that is used only once and is unlikely to be reused.",
      steps: [
        "Identify repeated configuration patterns.",
        "Decide whether a module, chart, overlay, library or reusable workflow fits the use case.",
        "Define clear inputs and expected outputs.",
        "Document defaults and supported options.",
        "Keep reusable components focused on one responsibility.",
        "Version shared components.",
        "Test changes against representative projects.",
        "Review the impact on existing consumers before upgrading.",
        "Avoid hiding critical security settings behind unclear defaults."
      ],
      commands:
        "# Terraform module initialization\nterraform init\n\n# List tracked Terraform files\nfind infrastructure -type f -name '*.tf'\n\n# Inspect GitHub workflow files\nfind .github/workflows -type f\n\n# Review Kubernetes configuration structure\nfind kubernetes -type f",
      config:
        "# Example reusable GitHub Actions workflow call\nname: Application CI\n\non:\n  pull_request:\n\npermissions:\n  contents: read\n\njobs:\n  build:\n    uses: organization/shared-workflows/.github/workflows/node-ci.yml@REPLACE_WITH_VERIFIED_VERSION\n    with:\n      node-version: \"22\"\n\n# The shared workflow must document its inputs and permissions.",
      problems: [
        {
          issue:
            "A shared module update unexpectedly affects multiple projects.",
          solution:
            "Use versioned modules, changelogs and compatibility testing. Upgrade consumers through reviewed changes rather than changing every project without validation."
        },
        {
          issue:
            "A reusable configuration hides important settings from users.",
          solution:
            "Document inputs, defaults and generated resources. Expose important security and availability controls clearly."
        }
      ]
    },

    {
      heading: "29. Configuration Change Management and Production Approvals",
      explanation:
        "Change management is the process of controlling changes to systems so that they do not introduce unnecessary risk. Not every configuration change has the same impact. Updating a development log level is different from changing a production firewall rule or deleting a database storage volume. Classify changes according to their risk. Low-risk changes may follow a normal automated review process. High-risk changes may require additional reviewers, a maintenance window, a tested rollback plan and explicit approval. Keep a record of what changed, why it changed, who approved it and when it was deployed. Emergency changes should be handled quickly but still recorded and reviewed afterward. A controlled process should not become unnecessary paperwork; its purpose is to make important changes understandable, safe and traceable.",
      steps: [
        "Describe the reason for every significant configuration change.",
        "Identify the affected applications, services and environments.",
        "Estimate the availability, security and cost impact.",
        "Run automated validation and tests.",
        "Obtain the required approval for high-risk changes.",
        "Choose an appropriate deployment window where necessary.",
        "Record the deployed configuration revision.",
        "Monitor the system after the change.",
        "Execute rollback when defined failure conditions occur.",
        "Review emergency changes afterward and update the source of truth."
      ],
      config:
        "# Example change record\nchange_id: CHG-EXAMPLE-001\nservice: devmavox-api\nenvironment: production\nreason: \"Increase application capacity\"\naffected_resources:\n  - application-deployment\n  - application-service\nvalidation:\n  - configuration-lint\n  - deployment-dry-run\n  - staging-test\nrollback_plan: \"Restore the previous approved deployment revision\"\napproval_required: true",
      problems: [
        {
          issue:
            "A configuration update causes an outage because dependencies were not identified.",
          solution:
            "Map dependent services before changes, review the rollout sequence and test the configuration in a representative environment."
        },
        {
          issue:
            "Emergency changes are never added back to the repository.",
          solution:
            "Require a follow-up review that records the emergency change in source control and confirms that the declared configuration matches the intended live state."
        }
      ]
    },

    {
      heading: "30. Production Readiness Checklist – Before Applying Any Configuration",
      explanation:
        "Before applying a configuration change to production, perform a final readiness review. The purpose is not to make deployment unnecessarily slow. It is to catch problems that can be identified before users are affected. Confirm that the configuration is correct, the dependencies are available, the required credentials are accessible and the deployment identity has the correct permissions. Review the expected changes and identify destructive operations. Check resource requirements, network access, health probes, persistent storage and monitoring. Confirm that the release can be traced to a source commit and artifact version. Finally, make sure the team knows how to stop or roll back the change. A configuration that passes syntax validation is not automatically production-ready. Production readiness requires correctness, security, reliability, observability and a recovery plan.",
      steps: [
        "Confirm the correct repository, branch and commit.",
        "Confirm the target environment and namespace.",
        "Check configuration syntax and formatting.",
        "Run the tool-specific validation commands.",
        "Review all changed values and resource references.",
        "Confirm that secrets are supplied through approved secure mechanisms.",
        "Verify that permissions follow least privilege.",
        "Review ports, firewall rules and network access.",
        "Review CPU, memory, storage and replica settings.",
        "Verify health checks and application readiness behavior.",
        "Confirm persistent data and backup requirements.",
        "Review Terraform plans for unexpected replacements or destruction.",
        "Confirm the container image and artifact version.",
        "Check that monitoring and logs are available.",
        "Confirm deployment approval requirements.",
        "Record the previous known-good release.",
        "Prepare and communicate the rollback procedure.",
        "Deploy in a controlled manner.",
        "Monitor the system after deployment.",
        "Record the final deployment status and lessons learned."
      ],
      commands:
        "# Final Git review\ngit status\ngit diff --check\ngit diff\n\n# YAML validation\nyamllint .\n\n# Docker Compose validation\ndocker compose config --quiet\n\n# Kubernetes dry run\nkubectl apply --dry-run=server -f kubernetes/\n\n# Terraform validation and plan\nterraform fmt -check -recursive\nterraform validate\nterraform plan\n\n# Check current Kubernetes status after deployment\nkubectl get deployments,pods,services -n production\nkubectl rollout status deployment/devmavox-app -n production\n\n# Review recent events\nkubectl get events -n production --sort-by=.metadata.creationTimestamp",
      config:
        "# Production readiness record\nproject: devmavox\nenvironment: production\nconfiguration_reviewed: true\nsyntax_validation_passed: true\nsecurity_review_completed: true\nsecrets_checked: true\npermissions_reviewed: true\nresource_capacity_checked: true\nnetwork_access_reviewed: true\nbackup_and_recovery_checked: true\nmonitoring_available: true\nrollback_plan_ready: true\nrelease_version: \"REPLACE_WITH_APPROVED_VERSION\"\nsource_commit: \"REPLACE_WITH_COMMIT_ID\"\n\n# This is a review record example, not an automated approval mechanism.",
      problems: [
        {
          issue:
            "A production deployment starts even though validation was not completed.",
          solution:
            "Use mandatory CI checks and protected deployment environments. Block release until required validation and approval steps pass."
        },
        {
          issue:
            "A deployment succeeds technically but users still experience problems.",
          solution:
            "Check user-facing health, latency, error rates, logs, dependencies and application behavior. A successful deployment command does not prove that the application is working correctly."
        },
        {
          issue:
            "The team does not know which release is currently running.",
          solution:
            "Record the image digest, release version, source commit and deployment timestamp. Maintain a searchable deployment history."
        }
      ]
    },

    {
      heading: "31. A-to-Z Configuration Learning and Daily Practice Plan",
      explanation:
        "The best way to learn configuration management is to write files, validate them, apply them in a safe environment and troubleshoot the errors. Reading examples is useful, but practical experience is what builds confidence. Start with simple YAML structures and understand mappings, lists, indentation and data types. Then create Docker Compose files and run multiple containers. Learn Kubernetes Deployments, Services, ConfigMaps, Secrets, probes and volumes. Practice writing Jenkins pipelines and GitHub Actions workflows. Finally, learn Terraform variables, resources, modules, state and plans. Keep all practice files in Git. Intentionally introduce small mistakes in a development environment and learn how the tools report them. Never experiment with destructive commands against production infrastructure. Build one complete project where application code, container build, CI pipeline, Kubernetes deployment and Terraform infrastructure work together.",
      steps: [
        "Learn YAML mappings, sequences, scalar values, indentation and quoting.",
        "Create a Dockerfile and a Compose configuration for a simple application.",
        "Add a database container and persistent volume.",
        "Create a Kubernetes Deployment and Service.",
        "Add ConfigMaps, Secrets and environment-specific configuration.",
        "Add resource requests, limits and health probes.",
        "Write a Jenkinsfile with checkout, build and test stages.",
        "Write a GitHub Actions workflow for pull-request validation.",
        "Add secure credential handling and minimal permissions.",
        "Create Terraform files for a small test infrastructure environment.",
        "Practice terraform init, fmt, validate, plan and apply.",
        "Learn remote state and state locking using a safe test setup.",
        "Add automated configuration validation to CI.",
        "Practice troubleshooting intentionally introduced configuration mistakes.",
        "Document every project with setup, validation, deployment and rollback steps."
      ],
      commands:
        "# Suggested learning workspace\nmkdir -p devops-config-practice/{docker,kubernetes,jenkins,.github/workflows,terraform,docs}\ncd devops-config-practice\n\n# Initialize Git\ngit init\n\n# Check the workspace structure\nfind . -maxdepth 3 -type d\n\n# Check configuration files after practice\nfind . -type f\n\n# Review progress\ngit status",
      config:
        "# Suggested final project structure\ndevops-config-practice/\n  docker/\n    Dockerfile\n    compose.yaml\n    .dockerignore\n  kubernetes/\n    deployment.yaml\n    service.yaml\n    configmap.yaml\n    secret-example.yaml\n  jenkins/\n    Jenkinsfile\n  .github/\n    workflows/\n      ci.yml\n  terraform/\n    versions.tf\n    provider.tf\n    variables.tf\n    main.tf\n    outputs.tf\n  docs/\n    architecture.md\n    deployment-guide.md\n    troubleshooting.md\n    rollback-guide.md\n\n# Use placeholder secrets only in practice files.\n# Never apply sample infrastructure to production without review.",
      problems: [
        {
          issue:
            "A learner can understand examples but cannot create a configuration independently.",
          solution:
            "Build a small project from an empty directory. Write the files without copying, validate them, run them and explain the purpose of every important field."
        },
        {
          issue:
            "Practice commands accidentally affect real cloud infrastructure.",
          solution:
            "Use a separate test account or isolated environment, restricted credentials and clear resource naming. Review every Terraform plan and avoid destructive commands unless intentionally testing recovery."
        },
        {
          issue:
            "A learner memorizes commands but cannot troubleshoot failures.",
          solution:
            "Practice realistic failure scenarios such as YAML indentation errors, wrong image names, missing environment variables, incorrect selectors and Terraform validation errors. Learn how to inspect logs, events and plans."
        }
      ]
    }
  ]
};

export default bestPracticesData;
