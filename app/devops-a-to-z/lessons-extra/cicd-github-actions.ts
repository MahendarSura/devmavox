import type { AtoZLesson } from "../lessons";

export const cicdAtoZLessons: Record<string, AtoZLesson> = {
  "cicd-github-actions/ci-cd-fundamentals": {
    "summary": "CI/CD is the practice of automating software integration, validation and delivery through repeatable pipeline workflows.",
    "diagram": {
      "title": "CI/CD Fundamentals workflow",
      "nodes": [
        "source event",
        "pipeline orchestration",
        "runner job",
        "validation steps",
        "artifact / deployment result"
      ],
      "explanation": "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "CI/CD is the practice of automating software integration, validation and delivery through repeatable pipeline workflows.",
          "This capability makes ci/cd fundamentals repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use CI/CD Fundamentals when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "CI/CD is the practice of automating software integration, validation and delivery through repeatable pipeline workflows. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain CI/CD Fundamentals with a practical CI/CD example.",
        "answer": "CI/CD is the practice of automating software integration, validation and delivery through repeatable pipeline workflows. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/continuous-integration": {
    "summary": "Continuous Integration merges small code changes frequently and validates them with automated builds and tests.",
    "diagram": {
      "title": "Continuous Integration workflow",
      "nodes": [
        "source event",
        "pipeline orchestration",
        "runner job",
        "validation steps",
        "artifact / deployment result"
      ],
      "explanation": "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Continuous Integration merges small code changes frequently and validates them with automated builds and tests.",
          "This capability makes continuous integration repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Continuous Integration when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Continuous Integration merges small code changes frequently and validates them with automated builds and tests. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Continuous Integration with a practical CI/CD example.",
        "answer": "Continuous Integration merges small code changes frequently and validates them with automated builds and tests. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/continuous-delivery": {
    "summary": "Continuous Delivery keeps every validated change deployable, with production release controlled by an explicit approval or business decision.",
    "diagram": {
      "title": "Continuous Delivery workflow",
      "nodes": [
        "source event",
        "pipeline orchestration",
        "runner job",
        "validation steps",
        "artifact / deployment result"
      ],
      "explanation": "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Continuous Delivery keeps every validated change deployable, with production release controlled by an explicit approval or business decision.",
          "This capability makes continuous delivery repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Continuous Delivery when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Continuous Delivery keeps every validated change deployable, with production release controlled by an explicit approval or business decision. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Continuous Delivery with a practical CI/CD example.",
        "answer": "Continuous Delivery keeps every validated change deployable, with production release controlled by an explicit approval or business decision. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/continuous-deployment": {
    "summary": "Continuous Deployment automatically releases every change that passes the defined quality and safety gates to production.",
    "diagram": {
      "title": "Continuous Deployment workflow",
      "nodes": [
        "source event",
        "pipeline orchestration",
        "runner job",
        "validation steps",
        "artifact / deployment result"
      ],
      "explanation": "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Continuous Deployment automatically releases every change that passes the defined quality and safety gates to production.",
          "This capability makes continuous deployment repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Continuous Deployment when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Continuous Deployment automatically releases every change that passes the defined quality and safety gates to production. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Continuous Deployment with a practical CI/CD example.",
        "answer": "Continuous Deployment automatically releases every change that passes the defined quality and safety gates to production. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/pipeline-architecture": {
    "summary": "Pipeline architecture defines how source events, validation stages, artifacts, approvals and deployment environments connect.",
    "diagram": {
      "title": "Pipeline Architecture workflow",
      "nodes": [
        "source event",
        "pipeline orchestration",
        "runner job",
        "validation steps",
        "artifact / deployment result"
      ],
      "explanation": "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Pipeline architecture defines how source events, validation stages, artifacts, approvals and deployment environments connect.",
          "This capability makes pipeline architecture repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Pipeline Architecture when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Pipeline architecture defines how source events, validation stages, artifacts, approvals and deployment environments connect. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Pipeline Architecture with a practical CI/CD example.",
        "answer": "Pipeline architecture defines how source events, validation stages, artifacts, approvals and deployment environments connect. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/pipeline-stages": {
    "summary": "Pipeline stages group related pipeline jobs such as checkout, build, test, scan, package and deploy.",
    "diagram": {
      "title": "Pipeline Stages workflow",
      "nodes": [
        "source event",
        "pipeline orchestration",
        "runner job",
        "validation steps",
        "artifact / deployment result"
      ],
      "explanation": "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Pipeline stages group related pipeline jobs such as checkout, build, test, scan, package and deploy.",
          "This capability makes pipeline stages repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Pipeline Stages when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Pipeline stages group related pipeline jobs such as checkout, build, test, scan, package and deploy. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Pipeline Stages with a practical CI/CD example.",
        "answer": "Pipeline stages group related pipeline jobs such as checkout, build, test, scan, package and deploy. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/build-automation": {
    "summary": "Build automation compiles source code and packages repeatable outputs using declared tools and dependencies.",
    "diagram": {
      "title": "Build Automation workflow",
      "nodes": [
        "source event",
        "pipeline orchestration",
        "runner job",
        "validation steps",
        "artifact / deployment result"
      ],
      "explanation": "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Build automation compiles source code and packages repeatable outputs using declared tools and dependencies.",
          "This capability makes build automation repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Build Automation when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Build automation compiles source code and packages repeatable outputs using declared tools and dependencies. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Build Automation with a practical CI/CD example.",
        "answer": "Build automation compiles source code and packages repeatable outputs using declared tools and dependencies. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/automated-testing": {
    "summary": "Automated testing runs unit, integration, contract and end-to-end checks as part of the delivery workflow.",
    "diagram": {
      "title": "Automated Testing workflow",
      "nodes": [
        "source event",
        "pipeline orchestration",
        "runner job",
        "validation steps",
        "artifact / deployment result"
      ],
      "explanation": "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Automated testing runs unit, integration, contract and end-to-end checks as part of the delivery workflow.",
          "This capability makes automated testing repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Automated Testing when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Automated testing runs unit, integration, contract and end-to-end checks as part of the delivery workflow. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Automated Testing with a practical CI/CD example.",
        "answer": "Automated testing runs unit, integration, contract and end-to-end checks as part of the delivery workflow. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/artifact-management": {
    "summary": "Artifact management stores immutable build outputs with version, provenance and retention information.",
    "diagram": {
      "title": "Artifact Management workflow",
      "nodes": [
        "source event",
        "pipeline orchestration",
        "runner job",
        "validation steps",
        "artifact / deployment result"
      ],
      "explanation": "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Artifact management stores immutable build outputs with version, provenance and retention information.",
          "This capability makes artifact management repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Artifact Management when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Artifact management stores immutable build outputs with version, provenance and retention information. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Artifact Management with a practical CI/CD example.",
        "answer": "Artifact management stores immutable build outputs with version, provenance and retention information. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/deployment-strategies": {
    "summary": "Deployment strategies control how new application versions reach users, for example rolling, blue-green or canary releases.",
    "diagram": {
      "title": "Deployment Strategies workflow",
      "nodes": [
        "source event",
        "pipeline orchestration",
        "runner job",
        "validation steps",
        "artifact / deployment result"
      ],
      "explanation": "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Deployment strategies control how new application versions reach users, for example rolling, blue-green or canary releases.",
          "This capability makes deployment strategies repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Deployment Strategies when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Deployment strategies control how new application versions reach users, for example rolling, blue-green or canary releases. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Deployment Strategies with a practical CI/CD example.",
        "answer": "Deployment strategies control how new application versions reach users, for example rolling, blue-green or canary releases. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/github-actions-introduction": {
    "summary": "GitHub Actions is GitHub's workflow automation platform for repository events, CI, releases and deployment.",
    "diagram": {
      "title": "GitHub Actions Introduction workflow",
      "nodes": [
        "Git push / pull request",
        "workflow trigger",
        "GitHub Actions scheduler",
        "runner",
        "jobs and steps",
        "checks / artifacts"
      ],
      "explanation": "Git push / pull request → workflow trigger → GitHub Actions scheduler → runner → jobs and steps → checks / artifacts. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "GitHub Actions is GitHub's workflow automation platform for repository events, CI, releases and deployment.",
          "This capability makes github actions introduction repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use GitHub Actions Introduction when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Git push / pull request → workflow trigger → GitHub Actions scheduler → runner → jobs and steps → checks / artifacts. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "GitHub Actions is GitHub's workflow automation platform for repository events, CI, releases and deployment. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain GitHub Actions Introduction with a practical CI/CD example.",
        "answer": "GitHub Actions is GitHub's workflow automation platform for repository events, CI, releases and deployment. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/workflow-yaml": {
    "summary": "A GitHub Actions workflow is a YAML file under .github/workflows that declares triggers, permissions, jobs and steps.",
    "diagram": {
      "title": "Workflow YAML workflow",
      "nodes": [
        ".github/workflows/*.yml",
        "YAML parse",
        "event filter",
        "job graph",
        "runner execution"
      ],
      "explanation": ".github/workflows/*.yml → YAML parse → event filter → job graph → runner execution. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A GitHub Actions workflow is a YAML file under .github/workflows that declares triggers, permissions, jobs and steps.",
          "This capability makes workflow yaml repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Workflow YAML when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          ".github/workflows/*.yml → YAML parse → event filter → job graph → runner execution. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A GitHub Actions workflow is a YAML file under .github/workflows that declares triggers, permissions, jobs and steps. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Workflow YAML with a practical CI/CD example.",
        "answer": "A GitHub Actions workflow is a YAML file under .github/workflows that declares triggers, permissions, jobs and steps. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/events-and-triggers": {
    "summary": "Events and triggers define which repository or external events start a workflow and with what filters.",
    "diagram": {
      "title": "Events and Triggers workflow",
      "nodes": [
        "repository event",
        "activity type / branch / path filters",
        "workflow run",
        "job scheduling"
      ],
      "explanation": "repository event → activity type / branch / path filters → workflow run → job scheduling. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Events and triggers define which repository or external events start a workflow and with what filters.",
          "This capability makes events and triggers repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Events and Triggers when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "repository event → activity type / branch / path filters → workflow run → job scheduling. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Events and triggers define which repository or external events start a workflow and with what filters. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Events and Triggers with a practical CI/CD example.",
        "answer": "Events and triggers define which repository or external events start a workflow and with what filters. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/jobs-and-steps": {
    "summary": "Jobs run on runners and contain ordered steps that execute shell commands or reusable actions.",
    "diagram": {
      "title": "Jobs and Steps workflow",
      "nodes": [
        "workflow job",
        "runner allocation",
        "ordered steps",
        "step outputs",
        "job result"
      ],
      "explanation": "workflow job → runner allocation → ordered steps → step outputs → job result. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Jobs run on runners and contain ordered steps that execute shell commands or reusable actions.",
          "This capability makes jobs and steps repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Jobs and Steps when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "workflow job → runner allocation → ordered steps → step outputs → job result. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Jobs run on runners and contain ordered steps that execute shell commands or reusable actions. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Jobs and Steps with a practical CI/CD example.",
        "answer": "Jobs run on runners and contain ordered steps that execute shell commands or reusable actions. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/runners": {
    "summary": "Runners are machines or execution environments that run GitHub Actions jobs.",
    "diagram": {
      "title": "Runners workflow",
      "nodes": [
        "workflow job",
        "runner labels and group",
        "runner workspace",
        "shell/action execution"
      ],
      "explanation": "workflow job → runner labels and group → runner workspace → shell/action execution. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Runners are machines or execution environments that run GitHub Actions jobs.",
          "This capability makes runners repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Runners when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "workflow job → runner labels and group → runner workspace → shell/action execution. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Runners are machines or execution environments that run GitHub Actions jobs. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Runners with a practical CI/CD example.",
        "answer": "Runners are machines or execution environments that run GitHub Actions jobs. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/hosted-and-self-hosted-runners": {
    "summary": "GitHub-hosted runners are managed by GitHub; self-hosted runners are operated by the organization on its own infrastructure.",
    "diagram": {
      "title": "Hosted and Self-hosted Runners workflow",
      "nodes": [
        "source event",
        "pipeline orchestration",
        "runner job",
        "validation steps",
        "artifact / deployment result"
      ],
      "explanation": "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "GitHub-hosted runners are managed by GitHub; self-hosted runners are operated by the organization on its own infrastructure.",
          "This capability makes hosted and self-hosted runners repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Hosted and Self-hosted Runners when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "GitHub-hosted runners are managed by GitHub; self-hosted runners are operated by the organization on its own infrastructure. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Hosted and Self-hosted Runners with a practical CI/CD example.",
        "answer": "GitHub-hosted runners are managed by GitHub; self-hosted runners are operated by the organization on its own infrastructure. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/actions-and-marketplace": {
    "summary": "Actions are reusable workflow components that package automation steps and can be sourced from repositories or the Marketplace.",
    "diagram": {
      "title": "Actions and Marketplace workflow",
      "nodes": [
        "source event",
        "pipeline orchestration",
        "runner job",
        "validation steps",
        "artifact / deployment result"
      ],
      "explanation": "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Actions are reusable workflow components that package automation steps and can be sourced from repositories or the Marketplace.",
          "This capability makes actions and marketplace repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Actions and Marketplace when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Actions are reusable workflow components that package automation steps and can be sourced from repositories or the Marketplace. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Actions and Marketplace with a practical CI/CD example.",
        "answer": "Actions are reusable workflow components that package automation steps and can be sourced from repositories or the Marketplace. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/workflow-contexts": {
    "summary": "Contexts expose workflow, job, runner, repository, event and step metadata to expressions.",
    "diagram": {
      "title": "Workflow Contexts workflow",
      "nodes": [
        "source event",
        "pipeline orchestration",
        "runner job",
        "validation steps",
        "artifact / deployment result"
      ],
      "explanation": "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Contexts expose workflow, job, runner, repository, event and step metadata to expressions.",
          "This capability makes workflow contexts repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Workflow Contexts when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Contexts expose workflow, job, runner, repository, event and step metadata to expressions. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Workflow Contexts with a practical CI/CD example.",
        "answer": "Contexts expose workflow, job, runner, repository, event and step metadata to expressions. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/expressions": {
    "summary": "Expressions dynamically evaluate workflow values and conditions using GitHub Actions expression syntax.",
    "diagram": {
      "title": "Expressions workflow",
      "nodes": [
        "source event",
        "pipeline orchestration",
        "runner job",
        "validation steps",
        "artifact / deployment result"
      ],
      "explanation": "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Expressions dynamically evaluate workflow values and conditions using GitHub Actions expression syntax.",
          "This capability makes expressions repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Expressions when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Expressions dynamically evaluate workflow values and conditions using GitHub Actions expression syntax. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Expressions with a practical CI/CD example.",
        "answer": "Expressions dynamically evaluate workflow values and conditions using GitHub Actions expression syntax. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/secrets-and-variables": {
    "summary": "Secrets store sensitive workflow values while variables store non-sensitive configuration for workflows and environments.",
    "diagram": {
      "title": "Secrets and Variables workflow",
      "nodes": [
        "source event",
        "pipeline orchestration",
        "runner job",
        "validation steps",
        "artifact / deployment result"
      ],
      "explanation": "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Secrets store sensitive workflow values while variables store non-sensitive configuration for workflows and environments.",
          "This capability makes secrets and variables repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Secrets and Variables when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Secrets store sensitive workflow values while variables store non-sensitive configuration for workflows and environments. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Secrets and Variables with a practical CI/CD example.",
        "answer": "Secrets store sensitive workflow values while variables store non-sensitive configuration for workflows and environments. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/artifacts-and-caching": {
    "summary": "Artifacts preserve workflow outputs between jobs or runs; caches accelerate repeated dependency and build operations.",
    "diagram": {
      "title": "Artifacts and Caching workflow",
      "nodes": [
        "source event",
        "pipeline orchestration",
        "runner job",
        "validation steps",
        "artifact / deployment result"
      ],
      "explanation": "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Artifacts preserve workflow outputs between jobs or runs; caches accelerate repeated dependency and build operations.",
          "This capability makes artifacts and caching repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Artifacts and Caching when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Artifacts preserve workflow outputs between jobs or runs; caches accelerate repeated dependency and build operations. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Artifacts and Caching with a practical CI/CD example.",
        "answer": "Artifacts preserve workflow outputs between jobs or runs; caches accelerate repeated dependency and build operations. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/reusable-workflows": {
    "summary": "Reusable workflows let one workflow call another to standardize shared CI/CD processes across repositories.",
    "diagram": {
      "title": "Reusable Workflows workflow",
      "nodes": [
        "caller workflow",
        "workflow_call interface",
        "reusable workflow jobs",
        "outputs"
      ],
      "explanation": "caller workflow → workflow_call interface → reusable workflow jobs → outputs. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Reusable workflows let one workflow call another to standardize shared CI/CD processes across repositories.",
          "This capability makes reusable workflows repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Reusable Workflows when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "caller workflow → workflow_call interface → reusable workflow jobs → outputs. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Reusable workflows let one workflow call another to standardize shared CI/CD processes across repositories. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Reusable Workflows with a practical CI/CD example.",
        "answer": "Reusable workflows let one workflow call another to standardize shared CI/CD processes across repositories. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/composite-actions": {
    "summary": "Composite actions package multiple workflow steps into a reusable action with defined inputs and outputs.",
    "diagram": {
      "title": "Composite Actions workflow",
      "nodes": [
        "workflow step",
        "action.yml inputs",
        "composite child steps",
        "outputs"
      ],
      "explanation": "workflow step → action.yml inputs → composite child steps → outputs. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Composite actions package multiple workflow steps into a reusable action with defined inputs and outputs.",
          "This capability makes composite actions repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Composite Actions when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "workflow step → action.yml inputs → composite child steps → outputs. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Composite actions package multiple workflow steps into a reusable action with defined inputs and outputs. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Composite Actions with a practical CI/CD example.",
        "answer": "Composite actions package multiple workflow steps into a reusable action with defined inputs and outputs. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/environments-and-approvals": {
    "summary": "GitHub environments group deployment configuration, protection rules, reviewers and environment-scoped secrets.",
    "diagram": {
      "title": "Environments and Approvals workflow",
      "nodes": [
        "deployment job",
        "environment protection rules",
        "reviewer approval",
        "environment secrets",
        "deploy"
      ],
      "explanation": "deployment job → environment protection rules → reviewer approval → environment secrets → deploy. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "GitHub environments group deployment configuration, protection rules, reviewers and environment-scoped secrets.",
          "This capability makes environments and approvals repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Environments and Approvals when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "deployment job → environment protection rules → reviewer approval → environment secrets → deploy. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "GitHub environments group deployment configuration, protection rules, reviewers and environment-scoped secrets. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Environments and Approvals with a practical CI/CD example.",
        "answer": "GitHub environments group deployment configuration, protection rules, reviewers and environment-scoped secrets. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/matrix-builds": {
    "summary": "Matrix strategies run a job across combinations of operating systems, runtimes or configuration values.",
    "diagram": {
      "title": "Matrix Builds workflow",
      "nodes": [
        "matrix dimensions",
        "expanded job combinations",
        "parallel runners",
        "aggregated checks"
      ],
      "explanation": "matrix dimensions → expanded job combinations → parallel runners → aggregated checks. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Matrix strategies run a job across combinations of operating systems, runtimes or configuration values.",
          "This capability makes matrix builds repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Matrix Builds when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "matrix dimensions → expanded job combinations → parallel runners → aggregated checks. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Matrix strategies run a job across combinations of operating systems, runtimes or configuration values. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Matrix Builds with a practical CI/CD example.",
        "answer": "Matrix strategies run a job across combinations of operating systems, runtimes or configuration values. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/oidc-authentication": {
    "summary": "OpenID Connect lets workflows exchange a short-lived identity token for cloud credentials without storing long-lived cloud keys.",
    "diagram": {
      "title": "OIDC Authentication workflow",
      "nodes": [
        "workflow job",
        "OIDC token request",
        "cloud trust policy validation",
        "short-lived role credentials",
        "cloud API"
      ],
      "explanation": "workflow job → OIDC token request → cloud trust policy validation → short-lived role credentials → cloud API. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "OpenID Connect lets workflows exchange a short-lived identity token for cloud credentials without storing long-lived cloud keys.",
          "This capability makes oidc authentication repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use OIDC Authentication when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "workflow job → OIDC token request → cloud trust policy validation → short-lived role credentials → cloud API. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "OpenID Connect lets workflows exchange a short-lived identity token for cloud credentials without storing long-lived cloud keys. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain OIDC Authentication with a practical CI/CD example.",
        "answer": "OpenID Connect lets workflows exchange a short-lived identity token for cloud credentials without storing long-lived cloud keys. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/container-based-workflows": {
    "summary": "Container-based workflows run jobs or steps inside containers to provide consistent toolchains and dependencies.",
    "diagram": {
      "title": "Container-based Workflows workflow",
      "nodes": [
        "source event",
        "pipeline orchestration",
        "runner job",
        "validation steps",
        "artifact / deployment result"
      ],
      "explanation": "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Container-based workflows run jobs or steps inside containers to provide consistent toolchains and dependencies.",
          "This capability makes container-based workflows repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Container-based Workflows when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Container-based workflows run jobs or steps inside containers to provide consistent toolchains and dependencies. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Container-based Workflows with a practical CI/CD example.",
        "answer": "Container-based workflows run jobs or steps inside containers to provide consistent toolchains and dependencies. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/deployment-to-aws": {
    "summary": "GitHub Actions can deploy to AWS using short-lived credentials, commonly through OIDC role assumption.",
    "diagram": {
      "title": "Deployment to AWS workflow",
      "nodes": [
        "source event",
        "pipeline orchestration",
        "runner job",
        "validation steps",
        "artifact / deployment result"
      ],
      "explanation": "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "GitHub Actions can deploy to AWS using short-lived credentials, commonly through OIDC role assumption.",
          "This capability makes deployment to aws repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Deployment to AWS when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "GitHub Actions can deploy to AWS using short-lived credentials, commonly through OIDC role assumption. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Deployment to AWS with a practical CI/CD example.",
        "answer": "GitHub Actions can deploy to AWS using short-lived credentials, commonly through OIDC role assumption. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/deployment-to-kubernetes": {
    "summary": "GitHub Actions can validate manifests, authenticate to a cluster and apply reviewed Kubernetes deployment changes.",
    "diagram": {
      "title": "Deployment to Kubernetes workflow",
      "nodes": [
        "source event",
        "pipeline orchestration",
        "runner job",
        "validation steps",
        "artifact / deployment result"
      ],
      "explanation": "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "GitHub Actions can validate manifests, authenticate to a cluster and apply reviewed Kubernetes deployment changes.",
          "This capability makes deployment to kubernetes repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Deployment to Kubernetes when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "GitHub Actions can validate manifests, authenticate to a cluster and apply reviewed Kubernetes deployment changes. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Deployment to Kubernetes with a practical CI/CD example.",
        "answer": "GitHub Actions can validate manifests, authenticate to a cluster and apply reviewed Kubernetes deployment changes. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/pipeline-security": {
    "summary": "Pipeline security protects source, dependencies, runners, secrets, permissions, artifacts and deployment credentials.",
    "diagram": {
      "title": "Pipeline Security workflow",
      "nodes": [
        "source event",
        "pipeline orchestration",
        "runner job",
        "validation steps",
        "artifact / deployment result"
      ],
      "explanation": "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Pipeline security protects source, dependencies, runners, secrets, permissions, artifacts and deployment credentials.",
          "This capability makes pipeline security repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Pipeline Security when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Pipeline security protects source, dependencies, runners, secrets, permissions, artifacts and deployment credentials. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Pipeline Security with a practical CI/CD example.",
        "answer": "Pipeline security protects source, dependencies, runners, secrets, permissions, artifacts and deployment credentials. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  },
  "cicd-github-actions/ci-cd-troubleshooting": {
    "summary": "CI/CD troubleshooting uses workflow logs, event payloads, permissions, runner state and artifact evidence to isolate failures.",
    "diagram": {
      "title": "CI/CD Troubleshooting workflow",
      "nodes": [
        "source event",
        "pipeline orchestration",
        "runner job",
        "validation steps",
        "artifact / deployment result"
      ],
      "explanation": "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. Each boundary has separate permissions and failure evidence; inspect event payload, job logs and outputs to identify where execution stopped."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "CI/CD troubleshooting uses workflow logs, event payloads, permissions, runner state and artifact evidence to isolate failures.",
          "This capability makes ci/cd troubleshooting repeatable and auditable. A good pipeline gives fast feedback, preserves traceable artifacts and applies production changes only through protected, least-privilege paths."
        ],
        "bullets": [
          "Keep workflow definitions in version control.",
          "Build once and promote the same immutable artifact.",
          "Make quality and security gates visible and repeatable."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use CI/CD Troubleshooting when a repository needs automated validation, packaging or deployment. A typical workflow starts on a pull request, runs lint and tests, creates a versioned artifact after merge, then deploys through an environment with the required approval.",
          "Separate untrusted pull-request execution from privileged deployment workflows. Use protected branches and environment rules for production."
        ],
        "bullets": [
          "Pull request: lint, test, scan and validate changes.",
          "Main branch: package and publish a traceable artifact.",
          "Release: promote the artifact through staging and production with approvals."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source event → pipeline orchestration → runner job → validation steps → artifact / deployment result. GitHub evaluates event filters and permissions, creates a job graph, allocates runners and executes each step in order. Outputs and artifacts can be passed between jobs or retained for later download.",
          "A green workflow is meaningful only when its checks cover the required quality gates and deployment verification. A job can succeed while the application is unhealthy if the pipeline never tests runtime behavior."
        ],
        "bullets": [
          "Trigger controls when the workflow starts.",
          "Jobs define dependencies and runner requirements.",
          "Steps run shell commands or actions.",
          "Permissions and secrets control access to external systems."
        ]
      },
      {
        "heading": "4. Practical workflow example",
        "paragraphs": [
          "Example CI workflow for a Node.js repository. Save as .github/workflows/ci.yml, adjust the Node version and package scripts to match the project, then validate it on a branch before merging."
        ],
        "code": "name: CI\\non:\\n  pull_request:\\n  push:\\n    branches: [main]\\npermissions:\\n  contents: read\\njobs:\\n  test:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v4\\n      - uses: actions/setup-node@v4\\n        with:\\n          node-version: 22\\n          cache: npm\\n      - run: npm ci\\n      - run: npm test -- --runInBand\\n      - run: npm run build",
        "note": "For production, pin third-party actions to reviewed full commit SHAs, use minimal permissions and avoid exposing secrets to untrusted pull-request code."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Set explicit workflow permissions, protect default branches, pin actions, review dependencies and isolate self-hosted runners. Use OIDC for cloud access where supported instead of long-lived access keys.",
          "Store deployment credentials in protected environments, retain artifacts with provenance and validate health after deployment. Define concurrency rules to avoid overlapping releases."
        ],
        "bullets": [
          "Use permissions: contents: read by default and grant only what a job needs.",
          "Use environment protection and required reviewers for production.",
          "Pin actions to immutable SHAs and review updates.",
          "Use OIDC trust conditions for repository, branch and environment.",
          "Separate build/test jobs from privileged deployment jobs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the workflow run, event type and first failed step. Check YAML syntax, branch/path filters, job dependencies, runner labels, permissions, action versions and secret availability.",
          "For deployment failures, inspect the cloud identity, role trust policy, target account/cluster, artifact digest and rollout health. Compare the failed run with the last successful workflow revision."
        ],
        "bullets": [
          "Workflow not triggered: inspect event, branch and path filters.",
          "Permission denied: inspect workflow/job permissions and token scope.",
          "Runner queued: check hosted capacity or self-hosted runner online state and labels.",
          "Action failure: inspect pinned version, inputs and action logs.",
          "Cloud auth failure: verify OIDC claims and trust conditions.",
          "Deployment unhealthy: inspect rollout status, events and application logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "CI/CD troubleshooting uses workflow logs, event payloads, permissions, runner state and artifact evidence to isolate failures. In a production pipeline, I would use least-privilege permissions, protected environments, immutable artifacts, automated tests and deployment health verification."
        ],
        "bullets": [
          "Explain trigger, jobs, steps and runners.",
          "Describe how secrets and cloud credentials are secured.",
          "Explain artifact promotion and deployment rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain CI/CD Troubleshooting with a practical CI/CD example.",
        "answer": "CI/CD troubleshooting uses workflow logs, event payloads, permissions, runner state and artifact evidence to isolate failures. I would implement it in a version-controlled workflow, validate it on pull requests, preserve the tested artifact and use protected environments and short-lived credentials for deployment."
      },
      {
        "question": "How do you troubleshoot a failed GitHub Actions workflow?",
        "answer": "Open the failed run, identify the first failed job and step, inspect event and runner context, then verify YAML, permissions, action versions, variables and secrets. For cloud deployment, validate OIDC trust and target identity. Re-run only after correcting the cause and verify deployment health."
      }
    ],
    "handsOn": [
      "Create a sample repository workflow that runs on pull requests and pushes to a test branch.",
      "Add lint, build and test steps; inspect the run logs and generated artifacts.",
      "Intentionally use a wrong script name or branch filter, diagnose why the workflow fails or does not trigger, then fix it.",
      "Write a secure deployment checklist covering permissions, OIDC, approvals, artifact identity and rollback."
    ]
  }
};
