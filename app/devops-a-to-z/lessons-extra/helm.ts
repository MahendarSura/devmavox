import type { AtoZLesson } from "../lessons";

export const helmAtoZLessons: Record<string, AtoZLesson> = {
  "helm/helm-introduction": {
    "summary": "Helm is a package manager for Kubernetes that packages manifests into charts and manages versioned releases.",
    "diagram": {
      "title": "Helm Introduction chart workflow",
      "nodes": [
        "Chart metadata + templates + values",
        "Helm rendering",
        "Kubernetes manifests",
        "release revision and cluster resources"
      ],
      "explanation": "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Helm is a package manager for Kubernetes that packages manifests into charts and manages versioned releases.",
          "This capability makes helm introduction repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Helm Introduction when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm version\nhelm list -A",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Helm is a package manager for Kubernetes that packages manifests into charts and manages versioned releases. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Helm Introduction with a Kubernetes DevOps example.",
        "answer": "Helm is a package manager for Kubernetes that packages manifests into charts and manages versioned releases. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/helm-architecture": {
    "summary": "Helm renders chart templates with values and interacts with the Kubernetes API to install and manage releases.",
    "diagram": {
      "title": "Helm Architecture chart workflow",
      "nodes": [
        "chart source + values",
        "Helm template engine",
        "rendered manifests",
        "Kubernetes API",
        "release record"
      ],
      "explanation": "chart source + values → Helm template engine → rendered manifests → Kubernetes API → release record. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Helm renders chart templates with values and interacts with the Kubernetes API to install and manage releases.",
          "This capability makes helm architecture repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Helm Architecture when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "chart source + values → Helm template engine → rendered manifests → Kubernetes API → release record. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm lint ./YOUR_CHART\nhelm template YOUR_RELEASE ./YOUR_CHART --debug\nhelm status YOUR_RELEASE -n YOUR_NAMESPACE",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Helm renders chart templates with values and interacts with the Kubernetes API to install and manage releases. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Helm Architecture with a Kubernetes DevOps example.",
        "answer": "Helm renders chart templates with values and interacts with the Kubernetes API to install and manage releases. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/charts": {
    "summary": "A Helm chart is a structured package containing metadata, default values, templates and optional dependencies.",
    "diagram": {
      "title": "Charts chart workflow",
      "nodes": [
        "Chart metadata + templates + values",
        "Helm rendering",
        "Kubernetes manifests",
        "release revision and cluster resources"
      ],
      "explanation": "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A Helm chart is a structured package containing metadata, default values, templates and optional dependencies.",
          "This capability makes charts repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Charts when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm create demo-chart\nhelm lint demo-chart\nhelm template demo demo-chart",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A Helm chart is a structured package containing metadata, default values, templates and optional dependencies. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Charts with a Kubernetes DevOps example.",
        "answer": "A Helm chart is a structured package containing metadata, default values, templates and optional dependencies. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/chart-yaml": {
    "summary": "Chart.yaml defines chart metadata such as name, version, application version, dependencies and chart type.",
    "diagram": {
      "title": "Chart.yaml chart workflow",
      "nodes": [
        "Chart metadata + templates + values",
        "Helm rendering",
        "Kubernetes manifests",
        "release revision and cluster resources"
      ],
      "explanation": "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Chart.yaml defines chart metadata such as name, version, application version, dependencies and chart type.",
          "This capability makes chart.yaml repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Chart.yaml when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm show chart ./demo-chart\nhelm lint ./demo-chart",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Chart.yaml defines chart metadata such as name, version, application version, dependencies and chart type. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Chart.yaml with a Kubernetes DevOps example.",
        "answer": "Chart.yaml defines chart metadata such as name, version, application version, dependencies and chart type. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/values-yaml": {
    "summary": "values.yaml contains default configuration values consumed by chart templates.",
    "diagram": {
      "title": "values.yaml chart workflow",
      "nodes": [
        "Chart metadata + templates + values",
        "Helm rendering",
        "Kubernetes manifests",
        "release revision and cluster resources"
      ],
      "explanation": "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "values.yaml contains default configuration values consumed by chart templates.",
          "This capability makes values.yaml repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use values.yaml when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm show values ./demo-chart\nhelm template demo ./demo-chart -f values.yaml",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "values.yaml contains default configuration values consumed by chart templates. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain values.yaml with a Kubernetes DevOps example.",
        "answer": "values.yaml contains default configuration values consumed by chart templates. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/templates": {
    "summary": "Helm templates are Kubernetes manifest templates rendered using chart values and Go template syntax.",
    "diagram": {
      "title": "Templates chart workflow",
      "nodes": [
        "templates/*.yaml + values.yaml",
        "Go template rendering",
        "Kubernetes YAML manifests"
      ],
      "explanation": "templates/*.yaml + values.yaml → Go template rendering → Kubernetes YAML manifests. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Helm templates are Kubernetes manifest templates rendered using chart values and Go template syntax.",
          "This capability makes templates repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Templates when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "templates/*.yaml + values.yaml → Go template rendering → Kubernetes YAML manifests. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm template demo ./demo-chart --debug",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Helm templates are Kubernetes manifest templates rendered using chart values and Go template syntax. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Templates with a Kubernetes DevOps example.",
        "answer": "Helm templates are Kubernetes manifest templates rendered using chart values and Go template syntax. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/template-functions": {
    "summary": "Template functions transform and format values during chart rendering, including string, collection and encoding operations.",
    "diagram": {
      "title": "Template Functions chart workflow",
      "nodes": [
        "Chart metadata + templates + values",
        "Helm rendering",
        "Kubernetes manifests",
        "release revision and cluster resources"
      ],
      "explanation": "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Template functions transform and format values during chart rendering, including string, collection and encoding operations.",
          "This capability makes template functions repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Template Functions when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm lint ./YOUR_CHART\nhelm template YOUR_RELEASE ./YOUR_CHART --debug\nhelm status YOUR_RELEASE -n YOUR_NAMESPACE",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Template functions transform and format values during chart rendering, including string, collection and encoding operations. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Template Functions with a Kubernetes DevOps example.",
        "answer": "Template functions transform and format values during chart rendering, including string, collection and encoding operations. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/built-in-objects": {
    "summary": "Helm built-in objects expose release, chart, capabilities and values metadata to templates.",
    "diagram": {
      "title": "Built-in Objects chart workflow",
      "nodes": [
        "Chart metadata + templates + values",
        "Helm rendering",
        "Kubernetes manifests",
        "release revision and cluster resources"
      ],
      "explanation": "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Helm built-in objects expose release, chart, capabilities and values metadata to templates.",
          "This capability makes built-in objects repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Built-in Objects when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm lint ./YOUR_CHART\nhelm template YOUR_RELEASE ./YOUR_CHART --debug\nhelm status YOUR_RELEASE -n YOUR_NAMESPACE",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Helm built-in objects expose release, chart, capabilities and values metadata to templates. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Built-in Objects with a Kubernetes DevOps example.",
        "answer": "Helm built-in objects expose release, chart, capabilities and values metadata to templates. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/pipelines-and-conditionals": {
    "summary": "Helm pipelines and conditional expressions transform template data and include or exclude manifest sections.",
    "diagram": {
      "title": "Pipelines and Conditionals chart workflow",
      "nodes": [
        "Chart metadata + templates + values",
        "Helm rendering",
        "Kubernetes manifests",
        "release revision and cluster resources"
      ],
      "explanation": "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Helm pipelines and conditional expressions transform template data and include or exclude manifest sections.",
          "This capability makes pipelines and conditionals repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Pipelines and Conditionals when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm lint ./YOUR_CHART\nhelm template YOUR_RELEASE ./YOUR_CHART --debug\nhelm status YOUR_RELEASE -n YOUR_NAMESPACE",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Helm pipelines and conditional expressions transform template data and include or exclude manifest sections. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Pipelines and Conditionals with a Kubernetes DevOps example.",
        "answer": "Helm pipelines and conditional expressions transform template data and include or exclude manifest sections. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/named-templates": {
    "summary": "Named templates define reusable template fragments that can be invoked from multiple chart files.",
    "diagram": {
      "title": "Named Templates chart workflow",
      "nodes": [
        "Chart metadata + templates + values",
        "Helm rendering",
        "Kubernetes manifests",
        "release revision and cluster resources"
      ],
      "explanation": "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Named templates define reusable template fragments that can be invoked from multiple chart files.",
          "This capability makes named templates repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Named Templates when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm lint ./YOUR_CHART\nhelm template YOUR_RELEASE ./YOUR_CHART --debug\nhelm status YOUR_RELEASE -n YOUR_NAMESPACE",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Named templates define reusable template fragments that can be invoked from multiple chart files. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Named Templates with a Kubernetes DevOps example.",
        "answer": "Named templates define reusable template fragments that can be invoked from multiple chart files. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/chart-helpers": {
    "summary": "_helpers.tpl commonly stores reusable named templates for labels, names and shared manifest snippets.",
    "diagram": {
      "title": "Chart Helpers chart workflow",
      "nodes": [
        "Chart metadata + templates + values",
        "Helm rendering",
        "Kubernetes manifests",
        "release revision and cluster resources"
      ],
      "explanation": "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "_helpers.tpl commonly stores reusable named templates for labels, names and shared manifest snippets.",
          "This capability makes chart helpers repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Chart Helpers when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm lint ./YOUR_CHART\nhelm template YOUR_RELEASE ./YOUR_CHART --debug\nhelm status YOUR_RELEASE -n YOUR_NAMESPACE",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "_helpers.tpl commonly stores reusable named templates for labels, names and shared manifest snippets. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Chart Helpers with a Kubernetes DevOps example.",
        "answer": "_helpers.tpl commonly stores reusable named templates for labels, names and shared manifest snippets. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/dependencies": {
    "summary": "Chart dependencies allow one chart to include other charts as subcharts with controlled versions and values.",
    "diagram": {
      "title": "Dependencies chart workflow",
      "nodes": [
        "parent Chart.yaml dependency",
        "dependency chart package",
        "merged values",
        "rendered resource set"
      ],
      "explanation": "parent Chart.yaml dependency → dependency chart package → merged values → rendered resource set. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Chart dependencies allow one chart to include other charts as subcharts with controlled versions and values.",
          "This capability makes dependencies repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Dependencies when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "parent Chart.yaml dependency → dependency chart package → merged values → rendered resource set. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm dependency list ./demo-chart\nhelm dependency update ./demo-chart",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Chart dependencies allow one chart to include other charts as subcharts with controlled versions and values. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Dependencies with a Kubernetes DevOps example.",
        "answer": "Chart dependencies allow one chart to include other charts as subcharts with controlled versions and values. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/chart-repositories": {
    "summary": "Chart repositories publish packaged charts and index metadata so users can discover and install chart versions.",
    "diagram": {
      "title": "Chart Repositories chart workflow",
      "nodes": [
        "Chart metadata + templates + values",
        "Helm rendering",
        "Kubernetes manifests",
        "release revision and cluster resources"
      ],
      "explanation": "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Chart repositories publish packaged charts and index metadata so users can discover and install chart versions.",
          "This capability makes chart repositories repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Chart Repositories when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm repo list\nhelm search repo nginx",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Chart repositories publish packaged charts and index metadata so users can discover and install chart versions. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Chart Repositories with a Kubernetes DevOps example.",
        "answer": "Chart repositories publish packaged charts and index metadata so users can discover and install chart versions. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/oci-registries": {
    "summary": "OCI registries store Helm charts as OCI artifacts alongside other container-related artifacts.",
    "diagram": {
      "title": "OCI Registries chart workflow",
      "nodes": [
        "Chart metadata + templates + values",
        "Helm rendering",
        "Kubernetes manifests",
        "release revision and cluster resources"
      ],
      "explanation": "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "OCI registries store Helm charts as OCI artifacts alongside other container-related artifacts.",
          "This capability makes oci registries repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use OCI Registries when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm registry list\nhelm show chart oci://REGISTRY/CHART",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "OCI registries store Helm charts as OCI artifacts alongside other container-related artifacts. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain OCI Registries with a Kubernetes DevOps example.",
        "answer": "OCI registries store Helm charts as OCI artifacts alongside other container-related artifacts. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/helm-install": {
    "summary": "helm install creates a new Helm release by rendering a chart and submitting the resulting resources to Kubernetes.",
    "diagram": {
      "title": "helm install chart workflow",
      "nodes": [
        "chart + release name + values",
        "render",
        "Kubernetes API create/update",
        "release revision"
      ],
      "explanation": "chart + release name + values → render → Kubernetes API create/update → release revision. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "helm install creates a new Helm release by rendering a chart and submitting the resulting resources to Kubernetes.",
          "This capability makes helm install repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use helm install when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "chart + release name + values → render → Kubernetes API create/update → release revision. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm install demo ./demo-chart --namespace demo --create-namespace --dry-run --debug",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "helm install creates a new Helm release by rendering a chart and submitting the resulting resources to Kubernetes. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain helm install with a Kubernetes DevOps example.",
        "answer": "helm install creates a new Helm release by rendering a chart and submitting the resulting resources to Kubernetes. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/helm-upgrade": {
    "summary": "helm upgrade updates an existing release using a new chart version or values configuration.",
    "diagram": {
      "title": "helm upgrade chart workflow",
      "nodes": [
        "new chart/values",
        "diff and render",
        "Kubernetes API patch/create",
        "new release revision"
      ],
      "explanation": "new chart/values → diff and render → Kubernetes API patch/create → new release revision. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "helm upgrade updates an existing release using a new chart version or values configuration.",
          "This capability makes helm upgrade repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use helm upgrade when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "new chart/values → diff and render → Kubernetes API patch/create → new release revision. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm upgrade demo ./demo-chart -n demo --dry-run --debug",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "helm upgrade updates an existing release using a new chart version or values configuration. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain helm upgrade with a Kubernetes DevOps example.",
        "answer": "helm upgrade updates an existing release using a new chart version or values configuration. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/helm-rollback": {
    "summary": "helm rollback returns a release to a previously recorded revision.",
    "diagram": {
      "title": "helm rollback chart workflow",
      "nodes": [
        "release history revision",
        "prior chart and values",
        "Kubernetes API restore",
        "new rollback revision"
      ],
      "explanation": "release history revision → prior chart and values → Kubernetes API restore → new rollback revision. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "helm rollback returns a release to a previously recorded revision.",
          "This capability makes helm rollback repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use helm rollback when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "release history revision → prior chart and values → Kubernetes API restore → new rollback revision. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm history demo -n demo\nhelm rollback demo REVISION -n demo --dry-run",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "helm rollback returns a release to a previously recorded revision. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain helm rollback with a Kubernetes DevOps example.",
        "answer": "helm rollback returns a release to a previously recorded revision. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/helm-uninstall": {
    "summary": "helm uninstall removes a Helm release and its managed resources according to release behavior.",
    "diagram": {
      "title": "helm uninstall chart workflow",
      "nodes": [
        "Chart metadata + templates + values",
        "Helm rendering",
        "Kubernetes manifests",
        "release revision and cluster resources"
      ],
      "explanation": "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "helm uninstall removes a Helm release and its managed resources according to release behavior.",
          "This capability makes helm uninstall repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use helm uninstall when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm list -A\nhelm uninstall demo -n demo --dry-run",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "helm uninstall removes a Helm release and its managed resources according to release behavior. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain helm uninstall with a Kubernetes DevOps example.",
        "answer": "helm uninstall removes a Helm release and its managed resources according to release behavior. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/release-lifecycle": {
    "summary": "A Helm release tracks an installed chart revision and its lifecycle history in a Kubernetes cluster.",
    "diagram": {
      "title": "Release Lifecycle chart workflow",
      "nodes": [
        "Chart metadata + templates + values",
        "Helm rendering",
        "Kubernetes manifests",
        "release revision and cluster resources"
      ],
      "explanation": "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A Helm release tracks an installed chart revision and its lifecycle history in a Kubernetes cluster.",
          "This capability makes release lifecycle repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Release Lifecycle when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm list -A\nhelm status demo -n demo\nhelm history demo -n demo",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A Helm release tracks an installed chart revision and its lifecycle history in a Kubernetes cluster. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Release Lifecycle with a Kubernetes DevOps example.",
        "answer": "A Helm release tracks an installed chart revision and its lifecycle history in a Kubernetes cluster. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/values-overrides": {
    "summary": "Values overrides replace chart defaults through values files, command-line flags or other supported input sources.",
    "diagram": {
      "title": "Values Overrides chart workflow",
      "nodes": [
        "Chart metadata + templates + values",
        "Helm rendering",
        "Kubernetes manifests",
        "release revision and cluster resources"
      ],
      "explanation": "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Values overrides replace chart defaults through values files, command-line flags or other supported input sources.",
          "This capability makes values overrides repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Values Overrides when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm template demo ./demo-chart -f values-dev.yaml --set replicaCount=2",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Values overrides replace chart defaults through values files, command-line flags or other supported input sources. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Values Overrides with a Kubernetes DevOps example.",
        "answer": "Values overrides replace chart defaults through values files, command-line flags or other supported input sources. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/environment-specific-values": {
    "summary": "Environment-specific values files provide different configuration for development, staging and production using the same chart.",
    "diagram": {
      "title": "Environment-specific Values chart workflow",
      "nodes": [
        "Chart metadata + templates + values",
        "Helm rendering",
        "Kubernetes manifests",
        "release revision and cluster resources"
      ],
      "explanation": "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Environment-specific values files provide different configuration for development, staging and production using the same chart.",
          "This capability makes environment-specific values repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Environment-specific Values when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm template demo ./demo-chart -f values-staging.yaml\nhelm template demo ./demo-chart -f values-production.yaml",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Environment-specific values files provide different configuration for development, staging and production using the same chart. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Environment-specific Values with a Kubernetes DevOps example.",
        "answer": "Environment-specific values files provide different configuration for development, staging and production using the same chart. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/subcharts": {
    "summary": "Subcharts are dependency charts included by a parent chart and configured through parent values.",
    "diagram": {
      "title": "Subcharts chart workflow",
      "nodes": [
        "Chart metadata + templates + values",
        "Helm rendering",
        "Kubernetes manifests",
        "release revision and cluster resources"
      ],
      "explanation": "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Subcharts are dependency charts included by a parent chart and configured through parent values.",
          "This capability makes subcharts repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Subcharts when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm lint ./YOUR_CHART\nhelm template YOUR_RELEASE ./YOUR_CHART --debug\nhelm status YOUR_RELEASE -n YOUR_NAMESPACE",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Subcharts are dependency charts included by a parent chart and configured through parent values. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Subcharts with a Kubernetes DevOps example.",
        "answer": "Subcharts are dependency charts included by a parent chart and configured through parent values. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/library-charts": {
    "summary": "Library charts provide reusable named templates and helpers without installing standalone Kubernetes resources.",
    "diagram": {
      "title": "Library Charts chart workflow",
      "nodes": [
        "Chart metadata + templates + values",
        "Helm rendering",
        "Kubernetes manifests",
        "release revision and cluster resources"
      ],
      "explanation": "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Library charts provide reusable named templates and helpers without installing standalone Kubernetes resources.",
          "This capability makes library charts repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Library Charts when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm lint ./YOUR_CHART\nhelm template YOUR_RELEASE ./YOUR_CHART --debug\nhelm status YOUR_RELEASE -n YOUR_NAMESPACE",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Library charts provide reusable named templates and helpers without installing standalone Kubernetes resources. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Library Charts with a Kubernetes DevOps example.",
        "answer": "Library charts provide reusable named templates and helpers without installing standalone Kubernetes resources. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/hooks": {
    "summary": "Helm hooks run specially annotated Kubernetes resources at defined points in install, upgrade, rollback or delete lifecycle.",
    "diagram": {
      "title": "Hooks chart workflow",
      "nodes": [
        "release lifecycle event",
        "hook weight ordering",
        "hook Job/Pod",
        "hook result",
        "release continues"
      ],
      "explanation": "release lifecycle event → hook weight ordering → hook Job/Pod → hook result → release continues. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Helm hooks run specially annotated Kubernetes resources at defined points in install, upgrade, rollback or delete lifecycle.",
          "This capability makes hooks repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Hooks when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "release lifecycle event → hook weight ordering → hook Job/Pod → hook result → release continues. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm get hooks demo -n demo\nhelm get manifest demo -n demo",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Helm hooks run specially annotated Kubernetes resources at defined points in install, upgrade, rollback or delete lifecycle. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Hooks with a Kubernetes DevOps example.",
        "answer": "Helm hooks run specially annotated Kubernetes resources at defined points in install, upgrade, rollback or delete lifecycle. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/chart-testing": {
    "summary": "Chart testing validates syntax, rendered manifests, policy and expected behavior before a chart is released.",
    "diagram": {
      "title": "Chart Testing chart workflow",
      "nodes": [
        "Chart metadata + templates + values",
        "Helm rendering",
        "Kubernetes manifests",
        "release revision and cluster resources"
      ],
      "explanation": "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Chart testing validates syntax, rendered manifests, policy and expected behavior before a chart is released.",
          "This capability makes chart testing repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Chart Testing when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm lint ./demo-chart\nhelm template demo ./demo-chart --debug\nhelm unittest ./demo-chart",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Chart testing validates syntax, rendered manifests, policy and expected behavior before a chart is released. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Chart Testing with a Kubernetes DevOps example.",
        "answer": "Chart testing validates syntax, rendered manifests, policy and expected behavior before a chart is released. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/helm-secrets": {
    "summary": "Helm secrets workflows encrypt sensitive values files or integrate with secret-management tooling to avoid plaintext secrets in Git.",
    "diagram": {
      "title": "Helm Secrets chart workflow",
      "nodes": [
        "Chart metadata + templates + values",
        "Helm rendering",
        "Kubernetes manifests",
        "release revision and cluster resources"
      ],
      "explanation": "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Helm secrets workflows encrypt sensitive values files or integrate with secret-management tooling to avoid plaintext secrets in Git.",
          "This capability makes helm secrets repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Helm Secrets when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm lint ./YOUR_CHART\nhelm template YOUR_RELEASE ./YOUR_CHART --debug\nhelm status YOUR_RELEASE -n YOUR_NAMESPACE",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Helm secrets workflows encrypt sensitive values files or integrate with secret-management tooling to avoid plaintext secrets in Git. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Helm Secrets with a Kubernetes DevOps example.",
        "answer": "Helm secrets workflows encrypt sensitive values files or integrate with secret-management tooling to avoid plaintext secrets in Git. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/helm-with-argo-cd": {
    "summary": "Argo CD can render Helm charts as an application source and reconcile the generated Kubernetes manifests.",
    "diagram": {
      "title": "Helm with Argo CD chart workflow",
      "nodes": [
        "Git chart source + values",
        "Argo CD Helm rendering",
        "desired manifests",
        "cluster reconciliation"
      ],
      "explanation": "Git chart source + values → Argo CD Helm rendering → desired manifests → cluster reconciliation. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Argo CD can render Helm charts as an application source and reconcile the generated Kubernetes manifests.",
          "This capability makes helm with argo cd repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Helm with Argo CD when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Git chart source + values → Argo CD Helm rendering → desired manifests → cluster reconciliation. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm lint ./YOUR_CHART\nhelm template YOUR_RELEASE ./YOUR_CHART --debug\nhelm status YOUR_RELEASE -n YOUR_NAMESPACE",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Argo CD can render Helm charts as an application source and reconcile the generated Kubernetes manifests. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Helm with Argo CD with a Kubernetes DevOps example.",
        "answer": "Argo CD can render Helm charts as an application source and reconcile the generated Kubernetes manifests. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/chart-versioning": {
    "summary": "Chart versioning tracks package changes while appVersion describes the application version represented by the chart.",
    "diagram": {
      "title": "Chart Versioning chart workflow",
      "nodes": [
        "Chart metadata + templates + values",
        "Helm rendering",
        "Kubernetes manifests",
        "release revision and cluster resources"
      ],
      "explanation": "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Chart versioning tracks package changes while appVersion describes the application version represented by the chart.",
          "This capability makes chart versioning repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Chart Versioning when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm lint ./YOUR_CHART\nhelm template YOUR_RELEASE ./YOUR_CHART --debug\nhelm status YOUR_RELEASE -n YOUR_NAMESPACE",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Chart versioning tracks package changes while appVersion describes the application version represented by the chart. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Chart Versioning with a Kubernetes DevOps example.",
        "answer": "Chart versioning tracks package changes while appVersion describes the application version represented by the chart. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  },
  "helm/troubleshooting-helm": {
    "summary": "Helm troubleshooting inspects chart metadata, dependencies, rendered manifests, release history and Kubernetes resource status.",
    "diagram": {
      "title": "Troubleshooting Helm chart workflow",
      "nodes": [
        "Chart metadata + templates + values",
        "Helm rendering",
        "Kubernetes manifests",
        "release revision and cluster resources"
      ],
      "explanation": "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm renders manifests before submitting them; rendered YAML and release history are key evidence during troubleshooting."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Helm troubleshooting inspects chart metadata, dependencies, rendered manifests, release history and Kubernetes resource status.",
          "This capability makes troubleshooting helm repeatable and configurable. Charts separate reusable Kubernetes resource templates from environment-specific values and provide release history for controlled changes."
        ],
        "bullets": [
          "Keep chart source and default values in version control.",
          "Validate rendered YAML before applying it to a cluster.",
          "Pin chart and dependency versions for reproducibility."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Troubleshooting Helm when packaging or deploying Kubernetes applications across multiple environments. A typical workflow builds and tests a chart, renders it with environment values, reviews the manifests and deploys a versioned release.",
          "For production, ensure values are reviewed, secrets are protected, resource requests and probes are defined, and rollback behavior is understood."
        ],
        "bullets": [
          "Development: render chart locally and test in a disposable namespace.",
          "CI: lint, template, policy-check and package the chart.",
          "Production: deploy approved chart versions with controlled values and release verification."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Chart metadata + templates + values → Helm rendering → Kubernetes manifests → release revision and cluster resources. Helm loads chart metadata, dependencies and values, renders Go templates, then interacts with the Kubernetes API for release operations. Release history records revisions and values used.",
          "A successful Helm command does not guarantee application health. Inspect the rendered manifests, Kubernetes rollout status, Pod events and application logs."
        ],
        "bullets": [
          "Chart: package metadata, templates and defaults.",
          "Values: configuration inputs that customize rendered resources.",
          "Release: installed instance of a chart with revision history.",
          "Kubernetes: executes the resulting resources and reports actual health."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a test chart and non-production namespace. Run lint and template first, inspect the output, then use dry-run before install or upgrade. Replace placeholders with your release, chart and namespace."
        ],
        "code": "helm status demo -n demo\nhelm history demo -n demo\nhelm get values demo -n demo --all\nhelm get manifest demo -n demo",
        "note": "Do not store plaintext passwords, tokens or private keys in values.yaml. Protect rendered output and release values because secrets may appear in manifests or stored release data."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use semantic chart versions, pin dependencies, validate schema and rendered manifests, and maintain environment-specific values under review. Use immutable chart artifacts and promote the same package across environments.",
          "Keep secret values in approved secret managers or encrypted workflows. Define health probes, resource limits, RBAC and network policies in the chart where appropriate."
        ],
        "bullets": [
          "Run helm lint and helm template in CI.",
          "Review diffs before upgrades and test rollback in staging.",
          "Avoid unpinned dependencies and mutable chart references.",
          "Use hooks carefully; failed hooks can block releases.",
          "Keep secrets out of Git and protect release metadata."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with helm status, helm history and helm get manifest/values. Determine whether failure occurred during chart loading, dependency resolution, template rendering, Kubernetes API submission or workload rollout.",
          "Use kubectl describe, events and logs to diagnose resource-level failures. Compare the current rendered manifest with the last successful revision before changing values."
        ],
        "bullets": [
          "Template error: inspect YAML indentation, values paths and template functions.",
          "Dependency error: verify repository, chart version and dependency lock.",
          "Upgrade timeout: inspect rollout, probes, scheduling and image pulls.",
          "Release pending: inspect hook Jobs and release operation history.",
          "Unexpected configuration: inspect values precedence and rendered manifests."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Helm troubleshooting inspects chart metadata, dependencies, rendered manifests, release history and Kubernetes resource status. In production, I would version charts, keep environment values reviewed, validate rendered YAML in CI, protect secrets and use release history for controlled rollback."
        ],
        "bullets": [
          "Explain chart, values and release differences.",
          "Describe template rendering and dependency resolution.",
          "Explain upgrade, rollback and troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Troubleshooting Helm with a Kubernetes DevOps example.",
        "answer": "Helm troubleshooting inspects chart metadata, dependencies, rendered manifests, release history and Kubernetes resource status. I would manage the chart in Git, validate and render it in CI, deploy a versioned package with environment-specific values, and verify Kubernetes health after the release."
      },
      {
        "question": "How do you troubleshoot a failed Helm deployment?",
        "answer": "Check helm status and history, render the chart with the exact values, inspect generated manifests, and review Kubernetes events and Pod logs. Verify dependencies, values precedence, API compatibility, hook Jobs and rollout health before retrying or rolling back."
      }
    ],
    "handsOn": [
      "Create a sample chart using helm create and inspect Chart.yaml, values.yaml and templates.",
      "Change a safe value, run helm lint and compare rendered YAML with helm template.",
      "Install into a disposable namespace, upgrade to a second revision and inspect release history.",
      "Simulate a bad image tag in the lab, diagnose the failed rollout and practice a controlled rollback."
    ]
  }
};
