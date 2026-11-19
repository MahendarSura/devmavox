import type { AtoZLesson } from "../lessons";

export const terraformAtoZLessons: Record<string, AtoZLesson> = {
  "terraform/infrastructure-as-code": {
    "summary": "Infrastructure as Code defines infrastructure through machine-readable files that can be reviewed, versioned and applied repeatedly.",
    "diagram": {
      "title": "Infrastructure as Code execution flow",
      "nodes": [
        "Git change",
        "Terraform configuration",
        "plan",
        "approval",
        "provider API",
        "cloud resources"
      ],
      "explanation": "Git change → Terraform configuration → plan → approval → provider API → cloud resources. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Infrastructure as Code defines infrastructure through machine-readable files that can be reviewed, versioned and applied repeatedly.",
          "It replaces undocumented manual provisioning with reproducible change plans and peer review."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Infrastructure as Code when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Git change → Terraform configuration → plan → approval → provider API → cloud resources. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform fmt -check\nterraform validate\nterraform plan",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Infrastructure as Code defines infrastructure through machine-readable files that can be reviewed, versioned and applied repeatedly. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Infrastructure as Code with a practical DevOps example.",
        "answer": "Infrastructure as Code defines infrastructure through machine-readable files that can be reviewed, versioned and applied repeatedly. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Infrastructure as Code.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/terraform-introduction": {
    "summary": "Terraform is an infrastructure-as-code tool that provisions and manages infrastructure through declarative configuration and providers.",
    "diagram": {
      "title": "Terraform Introduction execution flow",
      "nodes": [
        "HCL files",
        "terraform init",
        "plan",
        "apply",
        "state and provider resources"
      ],
      "explanation": "HCL files → terraform init → plan → apply → state and provider resources. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Terraform is an infrastructure-as-code tool that provisions and manages infrastructure through declarative configuration and providers.",
          "It lets DevOps teams review infrastructure changes before applying them and keep environments consistent."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Terraform Introduction when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "HCL files → terraform init → plan → apply → state and provider resources. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform fmt -check\nterraform validate\nterraform plan",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Terraform is an infrastructure-as-code tool that provisions and manages infrastructure through declarative configuration and providers. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Terraform Introduction with a practical DevOps example.",
        "answer": "Terraform is an infrastructure-as-code tool that provisions and manages infrastructure through declarative configuration and providers. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Terraform Introduction.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/terraform-architecture": {
    "summary": "Terraform loads configuration, initializes providers and modules, builds a dependency graph, plans changes and applies operations while tracking state.",
    "diagram": {
      "title": "Terraform Architecture execution flow",
      "nodes": [
        "HCL configuration",
        "Core graph engine",
        "provider plugin",
        "remote API",
        "state"
      ],
      "explanation": "HCL configuration → Core graph engine → provider plugin → remote API → state. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Terraform loads configuration, initializes providers and modules, builds a dependency graph, plans changes and applies operations while tracking state.",
          "Understanding this flow helps troubleshoot provider, graph, state and API failures."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Terraform Architecture when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "HCL configuration → Core graph engine → provider plugin → remote API → state. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform fmt -check\nterraform validate\nterraform plan",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Terraform loads configuration, initializes providers and modules, builds a dependency graph, plans changes and applies operations while tracking state. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Terraform Architecture with a practical DevOps example.",
        "answer": "Terraform loads configuration, initializes providers and modules, builds a dependency graph, plans changes and applies operations while tracking state. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Terraform Architecture.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/providers": {
    "summary": "Providers are plugins that translate Terraform resource and data-source operations into API calls for a platform.",
    "diagram": {
      "title": "Providers execution flow",
      "nodes": [
        "Terraform Core",
        "provider plugin",
        "authenticated platform API"
      ],
      "explanation": "Terraform Core → provider plugin → authenticated platform API. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Providers are plugins that translate Terraform resource and data-source operations into API calls for a platform.",
          "Pin provider versions and configure authentication explicitly for repeatable plans."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Providers when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Terraform Core → provider plugin → authenticated platform API. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform fmt -check\nterraform validate\nterraform plan",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Providers are plugins that translate Terraform resource and data-source operations into API calls for a platform. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Providers with a practical DevOps example.",
        "answer": "Providers are plugins that translate Terraform resource and data-source operations into API calls for a platform. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Providers.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/resources": {
    "summary": "Resources declare infrastructure objects Terraform should create, update or destroy.",
    "diagram": {
      "title": "Resources execution flow",
      "nodes": [
        "resource block",
        "dependency graph",
        "provider CRUD API",
        "state"
      ],
      "explanation": "resource block → dependency graph → provider CRUD API → state. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Resources declare infrastructure objects Terraform should create, update or destroy.",
          "Use resources to manage cloud infrastructure and shared platform components as code."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Resources when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "resource block → dependency graph → provider CRUD API → state. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform fmt -check\nterraform validate\nterraform plan",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Resources declare infrastructure objects Terraform should create, update or destroy. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Resources with a practical DevOps example.",
        "answer": "Resources declare infrastructure objects Terraform should create, update or destroy. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Resources.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/data-sources": {
    "summary": "Data sources read existing infrastructure information for use in Terraform expressions without managing that object lifecycle.",
    "diagram": {
      "title": "Data Sources execution flow",
      "nodes": [
        "data block",
        "provider read API",
        "attributes",
        "dependent resource"
      ],
      "explanation": "data block → provider read API → attributes → dependent resource. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Data sources read existing infrastructure information for use in Terraform expressions without managing that object lifecycle.",
          "Use them to reference shared networking, images or existing platform resources without duplicating ownership."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Data Sources when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "data block → provider read API → attributes → dependent resource. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform fmt -check\nterraform validate\nterraform plan",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Data sources read existing infrastructure information for use in Terraform expressions without managing that object lifecycle. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Data Sources with a practical DevOps example.",
        "answer": "Data sources read existing infrastructure information for use in Terraform expressions without managing that object lifecycle. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Data Sources.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/variables": {
    "summary": "Input variables parameterize Terraform configuration so the same module can be reused with different values.",
    "diagram": {
      "title": "Variables execution flow",
      "nodes": [
        "tfvars / CLI / environment",
        "variable validation",
        "expression evaluation"
      ],
      "explanation": "tfvars / CLI / environment → variable validation → expression evaluation. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Input variables parameterize Terraform configuration so the same module can be reused with different values.",
          "Use typed variables and validation to make configuration safe and understandable."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Variables when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "tfvars / CLI / environment → variable validation → expression evaluation. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform fmt -check\nterraform validate\nterraform plan",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Input variables parameterize Terraform configuration so the same module can be reused with different values. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Variables with a practical DevOps example.",
        "answer": "Input variables parameterize Terraform configuration so the same module can be reused with different values. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Variables.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/outputs": {
    "summary": "Outputs expose selected values from a Terraform configuration or module after evaluation.",
    "diagram": {
      "title": "Outputs execution flow",
      "nodes": [
        "resource attributes",
        "output block",
        "CLI / parent module"
      ],
      "explanation": "resource attributes → output block → CLI / parent module. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Outputs expose selected values from a Terraform configuration or module after evaluation.",
          "Use outputs to share resource identifiers and endpoints with other modules or deployment automation."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Outputs when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "resource attributes → output block → CLI / parent module. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform fmt -check\nterraform validate\nterraform plan",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Outputs expose selected values from a Terraform configuration or module after evaluation. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Outputs with a practical DevOps example.",
        "answer": "Outputs expose selected values from a Terraform configuration or module after evaluation. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Outputs.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/locals": {
    "summary": "Local values name reusable expressions inside a module to reduce repetition and improve readability.",
    "diagram": {
      "title": "Locals execution flow",
      "nodes": [
        "variables and data",
        "locals evaluation",
        "resource arguments"
      ],
      "explanation": "variables and data → locals evaluation → resource arguments. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Local values name reusable expressions inside a module to reduce repetition and improve readability.",
          "Use locals for derived names, tags and repeated expressions, not as a substitute for inputs."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Locals when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "variables and data → locals evaluation → resource arguments. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform fmt -check\nterraform validate\nterraform plan",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Local values name reusable expressions inside a module to reduce repetition and improve readability. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Locals with a practical DevOps example.",
        "answer": "Local values name reusable expressions inside a module to reduce repetition and improve readability. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Locals.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/expressions-and-functions": {
    "summary": "Terraform expressions combine values, references, operators and built-in functions to calculate configuration values.",
    "diagram": {
      "title": "Expressions and Functions execution flow",
      "nodes": [
        "input/data/resource values",
        "expression evaluation",
        "planned arguments"
      ],
      "explanation": "input/data/resource values → expression evaluation → planned arguments. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Terraform expressions combine values, references, operators and built-in functions to calculate configuration values.",
          "Use expressions to derive resource settings and avoid hardcoding repeated values."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Expressions and Functions when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "input/data/resource values → expression evaluation → planned arguments. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform fmt -check\nterraform validate\nterraform plan",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Terraform expressions combine values, references, operators and built-in functions to calculate configuration values. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Expressions and Functions with a practical DevOps example.",
        "answer": "Terraform expressions combine values, references, operators and built-in functions to calculate configuration values. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Expressions and Functions.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/terraform-configuration-language": {
    "summary": "HCL is Terraform's configuration language for declaring blocks, arguments, types and expressions.",
    "diagram": {
      "title": "Terraform Configuration Language execution flow",
      "nodes": [
        ".tf files",
        "HCL parser",
        "validated configuration model"
      ],
      "explanation": ".tf files → HCL parser → validated configuration model. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "HCL is Terraform's configuration language for declaring blocks, arguments, types and expressions.",
          "Understand block syntax and types to create valid, maintainable infrastructure definitions."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Terraform Configuration Language when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          ".tf files → HCL parser → validated configuration model. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform fmt -check\nterraform validate\nterraform plan",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "HCL is Terraform's configuration language for declaring blocks, arguments, types and expressions. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Terraform Configuration Language with a practical DevOps example.",
        "answer": "HCL is Terraform's configuration language for declaring blocks, arguments, types and expressions. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Terraform Configuration Language.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/terraform-init": {
    "summary": "terraform init initializes a working directory by installing required providers and modules and configuring the backend.",
    "diagram": {
      "title": "terraform init execution flow",
      "nodes": [
        "configuration",
        "backend initialization",
        "provider/module installation",
        ".terraform metadata"
      ],
      "explanation": "configuration → backend initialization → provider/module installation → .terraform metadata. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "terraform init initializes a working directory by installing required providers and modules and configuring the backend.",
          "Run it when starting a project or when provider, module or backend requirements change."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use terraform init when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "configuration → backend initialization → provider/module installation → .terraform metadata. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform version\nterraform init",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "terraform init initializes a working directory by installing required providers and modules and configuring the backend. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain terraform init with a practical DevOps example.",
        "answer": "terraform init initializes a working directory by installing required providers and modules and configuring the backend. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate terraform init.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/terraform-plan": {
    "summary": "terraform plan compares configuration and state with remote objects and proposes actions without applying them.",
    "diagram": {
      "title": "terraform plan execution flow",
      "nodes": [
        "configuration + state + provider refresh",
        "dependency graph",
        "proposed change plan"
      ],
      "explanation": "configuration + state + provider refresh → dependency graph → proposed change plan. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "terraform plan compares configuration and state with remote objects and proposes actions without applying them.",
          "Review plans before changes to catch replacement, deletion and unexpected drift."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use terraform plan when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "configuration + state + provider refresh → dependency graph → proposed change plan. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform fmt -check\nterraform validate\nterraform plan -out=tfplan",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "terraform plan compares configuration and state with remote objects and proposes actions without applying them. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain terraform plan with a practical DevOps example.",
        "answer": "terraform plan compares configuration and state with remote objects and proposes actions without applying them. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate terraform plan.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/terraform-apply": {
    "summary": "terraform apply executes the approved plan and updates state after provider operations.",
    "diagram": {
      "title": "terraform apply execution flow",
      "nodes": [
        "saved plan",
        "provider API operations",
        "resource results",
        "updated state"
      ],
      "explanation": "saved plan → provider API operations → resource results → updated state. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "terraform apply executes the approved plan and updates state after provider operations.",
          "Use it to perform reviewed infrastructure changes in a controlled pipeline or operator workflow."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use terraform apply when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "saved plan → provider API operations → resource results → updated state. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform plan -out=tfplan\nterraform apply tfplan",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "terraform apply executes the approved plan and updates state after provider operations. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain terraform apply with a practical DevOps example.",
        "answer": "terraform apply executes the approved plan and updates state after provider operations. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate terraform apply.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/terraform-destroy": {
    "summary": "terraform destroy plans and removes infrastructure managed by the selected Terraform configuration and state.",
    "diagram": {
      "title": "terraform destroy execution flow",
      "nodes": [
        "configuration + state",
        "destroy plan",
        "approval",
        "provider delete operations"
      ],
      "explanation": "configuration + state → destroy plan → approval → provider delete operations. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "terraform destroy plans and removes infrastructure managed by the selected Terraform configuration and state.",
          "Use only for disposable environments or explicitly approved decommissioning; it can delete real resources."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use terraform destroy when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "configuration + state → destroy plan → approval → provider delete operations. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform plan -destroy -out=destroy.tfplan\n# Review the plan and obtain approval before executing.\nterraform apply destroy.tfplan",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "terraform destroy plans and removes infrastructure managed by the selected Terraform configuration and state. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain terraform destroy with a practical DevOps example.",
        "answer": "terraform destroy plans and removes infrastructure managed by the selected Terraform configuration and state. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate terraform destroy.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/state-file": {
    "summary": "Terraform state maps configuration addresses to real infrastructure objects and stores attributes needed for future plans.",
    "diagram": {
      "title": "State File execution flow",
      "nodes": [
        "resource address ↔ remote object ID and attributes in state"
      ],
      "explanation": "resource address ↔ remote object ID and attributes in state. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Terraform state maps configuration addresses to real infrastructure objects and stores attributes needed for future plans.",
          "Protect state because it can contain sensitive values and is essential for accurate change tracking."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use State File when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "resource address ↔ remote object ID and attributes in state. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform state list\nterraform state show YOUR_RESOURCE_ADDRESS",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Terraform state maps configuration addresses to real infrastructure objects and stores attributes needed for future plans. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain State File with a practical DevOps example.",
        "answer": "Terraform state maps configuration addresses to real infrastructure objects and stores attributes needed for future plans. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate State File.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/remote-state": {
    "summary": "Remote state stores Terraform state in a shared backend rather than only on one engineer's machine.",
    "diagram": {
      "title": "Remote State execution flow",
      "nodes": [
        "Terraform client",
        "authenticated backend",
        "shared state object"
      ],
      "explanation": "Terraform client → authenticated backend → shared state object. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Remote state stores Terraform state in a shared backend rather than only on one engineer's machine.",
          "It supports team collaboration, centralized access control and shared automation."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Remote State when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Terraform client → authenticated backend → shared state object. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform state list\nterraform output",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Remote state stores Terraform state in a shared backend rather than only on one engineer's machine. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Remote State with a practical DevOps example.",
        "answer": "Remote state stores Terraform state in a shared backend rather than only on one engineer's machine. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Remote State.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/state-locking": {
    "summary": "State locking prevents concurrent operations from writing the same state at the same time when the backend supports locking.",
    "diagram": {
      "title": "State Locking execution flow",
      "nodes": [
        "Terraform operation",
        "backend lock acquisition",
        "state read/write",
        "lock release"
      ],
      "explanation": "Terraform operation → backend lock acquisition → state read/write → lock release. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "State locking prevents concurrent operations from writing the same state at the same time when the backend supports locking.",
          "It avoids competing applies corrupting or overwriting shared state."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use State Locking when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Terraform operation → backend lock acquisition → state read/write → lock release. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform plan\n# If a lock remains, verify no operation is active before considering force-unlock.",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "State locking prevents concurrent operations from writing the same state at the same time when the backend supports locking. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain State Locking with a practical DevOps example.",
        "answer": "State locking prevents concurrent operations from writing the same state at the same time when the backend supports locking. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate State Locking.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/backend-configuration": {
    "summary": "A backend defines where Terraform stores state and how state operations are coordinated.",
    "diagram": {
      "title": "Backend Configuration execution flow",
      "nodes": [
        "backend block",
        "init/migration workflow",
        "remote state storage"
      ],
      "explanation": "backend block → init/migration workflow → remote state storage. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A backend defines where Terraform stores state and how state operations are coordinated.",
          "Configure a secure shared backend before team collaboration and avoid changing backend settings casually."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Backend Configuration when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "backend block → init/migration workflow → remote state storage. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform init -reconfigure\nterraform init -migrate-state",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A backend defines where Terraform stores state and how state operations are coordinated. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Backend Configuration with a practical DevOps example.",
        "answer": "A backend defines where Terraform stores state and how state operations are coordinated. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Backend Configuration.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/modules": {
    "summary": "A module is a reusable package of Terraform configuration with inputs, resources and outputs.",
    "diagram": {
      "title": "Modules execution flow",
      "nodes": [
        "root module",
        "child module inputs",
        "child resources",
        "module outputs"
      ],
      "explanation": "root module → child module inputs → child resources → module outputs. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A module is a reusable package of Terraform configuration with inputs, resources and outputs.",
          "Use modules to standardize repeatable infrastructure patterns across environments and teams."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Modules when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "root module → child module inputs → child resources → module outputs. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform get\nterraform init\nterraform validate",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A module is a reusable package of Terraform configuration with inputs, resources and outputs. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Modules with a practical DevOps example.",
        "answer": "A module is a reusable package of Terraform configuration with inputs, resources and outputs. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Modules.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/module-registry": {
    "summary": "The Terraform Module Registry distributes versioned reusable modules for common infrastructure patterns.",
    "diagram": {
      "title": "Module Registry execution flow",
      "nodes": [
        "module source + version",
        "registry download",
        "module configuration"
      ],
      "explanation": "module source + version → registry download → module configuration. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "The Terraform Module Registry distributes versioned reusable modules for common infrastructure patterns.",
          "Use trusted modules with pinned versions and review their code and inputs before use."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Module Registry when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "module source + version → registry download → module configuration. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform fmt -check\nterraform validate\nterraform plan",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The Terraform Module Registry distributes versioned reusable modules for common infrastructure patterns. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Module Registry with a practical DevOps example.",
        "answer": "The Terraform Module Registry distributes versioned reusable modules for common infrastructure patterns. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Module Registry.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/module-composition": {
    "summary": "Module composition connects smaller modules through explicit inputs and outputs to build a complete platform.",
    "diagram": {
      "title": "Module Composition execution flow",
      "nodes": [
        "root module",
        "network module outputs",
        "app module inputs",
        "database module"
      ],
      "explanation": "root module → network module outputs → app module inputs → database module. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Module composition connects smaller modules through explicit inputs and outputs to build a complete platform.",
          "Use it to separate network, compute, database and observability ownership while preserving dependency clarity."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Module Composition when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "root module → network module outputs → app module inputs → database module. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform fmt -check\nterraform validate\nterraform plan",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Module composition connects smaller modules through explicit inputs and outputs to build a complete platform. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Module Composition with a practical DevOps example.",
        "answer": "Module composition connects smaller modules through explicit inputs and outputs to build a complete platform. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Module Composition.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/workspaces": {
    "summary": "Terraform CLI workspaces provide separate state instances for one configuration within a working directory.",
    "diagram": {
      "title": "Workspaces execution flow",
      "nodes": [
        "same configuration",
        "workspace selection",
        "distinct state instance"
      ],
      "explanation": "same configuration → workspace selection → distinct state instance. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Terraform CLI workspaces provide separate state instances for one configuration within a working directory.",
          "They can separate simple environments, but do not replace strong account or credential isolation for production."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Workspaces when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "same configuration → workspace selection → distinct state instance. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform workspace list\nterraform workspace show\nterraform workspace new dev",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Terraform CLI workspaces provide separate state instances for one configuration within a working directory. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Workspaces with a practical DevOps example.",
        "answer": "Terraform CLI workspaces provide separate state instances for one configuration within a working directory. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Workspaces.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/for-each-and-count": {
    "summary": "count and for_each create multiple resource or module instances from numeric or keyed collections.",
    "diagram": {
      "title": "for_each and count execution flow",
      "nodes": [
        "collection",
        "instance expansion",
        "resource addresses"
      ],
      "explanation": "collection → instance expansion → resource addresses. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "count and for_each create multiple resource or module instances from numeric or keyed collections.",
          "Use for_each for stable keyed identities and count for simple positional repetition."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use for_each and count when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "collection → instance expansion → resource addresses. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform plan\nterraform state list",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "count and for_each create multiple resource or module instances from numeric or keyed collections. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain for_each and count with a practical DevOps example.",
        "answer": "count and for_each create multiple resource or module instances from numeric or keyed collections. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate for_each and count.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/dynamic-blocks": {
    "summary": "Dynamic blocks generate repeated nested configuration blocks from collections.",
    "diagram": {
      "title": "Dynamic Blocks execution flow",
      "nodes": [
        "collection",
        "dynamic content iteration",
        "nested provider blocks"
      ],
      "explanation": "collection → dynamic content iteration → nested provider blocks. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Dynamic blocks generate repeated nested configuration blocks from collections.",
          "Use them when provider schemas contain repeatable nested blocks and static repetition would be excessive."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Dynamic Blocks when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "collection → dynamic content iteration → nested provider blocks. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform fmt -check\nterraform validate\nterraform plan",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Dynamic blocks generate repeated nested configuration blocks from collections. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Dynamic Blocks with a practical DevOps example.",
        "answer": "Dynamic blocks generate repeated nested configuration blocks from collections. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Dynamic Blocks.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/dependencies": {
    "summary": "Terraform dependencies determine the order in which resources are created, updated and destroyed.",
    "diagram": {
      "title": "Dependencies execution flow",
      "nodes": [
        "resource references",
        "dependency graph",
        "ordered operations"
      ],
      "explanation": "resource references → dependency graph → ordered operations. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Terraform dependencies determine the order in which resources are created, updated and destroyed.",
          "Use expression references for implicit dependencies and depends_on only when a real hidden dependency exists."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Dependencies when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "resource references → dependency graph → ordered operations. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform graph > graph.dot\nterraform plan",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Terraform dependencies determine the order in which resources are created, updated and destroyed. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Dependencies with a practical DevOps example.",
        "answer": "Terraform dependencies determine the order in which resources are created, updated and destroyed. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Dependencies.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/lifecycle-meta-arguments": {
    "summary": "Lifecycle meta-arguments customize resource replacement, deletion and change behavior.",
    "diagram": {
      "title": "Lifecycle Meta-Arguments execution flow",
      "nodes": [
        "resource lifecycle settings",
        "graph planning",
        "create/update/replace/destroy behavior"
      ],
      "explanation": "resource lifecycle settings → graph planning → create/update/replace/destroy behavior. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Lifecycle meta-arguments customize resource replacement, deletion and change behavior.",
          "Use create_before_destroy, prevent_destroy and ignore_changes carefully because they alter normal lifecycle behavior."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Lifecycle Meta-Arguments when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "resource lifecycle settings → graph planning → create/update/replace/destroy behavior. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform fmt -check\nterraform validate\nterraform plan",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Lifecycle meta-arguments customize resource replacement, deletion and change behavior. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Lifecycle Meta-Arguments with a practical DevOps example.",
        "answer": "Lifecycle meta-arguments customize resource replacement, deletion and change behavior. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Lifecycle Meta-Arguments.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/provisioners": {
    "summary": "Provisioners run scripts on local or remote machines during resource creation or destruction.",
    "diagram": {
      "title": "Provisioners execution flow",
      "nodes": [
        "resource operation",
        "provisioner connection",
        "command execution"
      ],
      "explanation": "resource operation → provisioner connection → command execution. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Provisioners run scripts on local or remote machines during resource creation or destruction.",
          "Use provisioners only as a last resort; prefer cloud-init, images, configuration management or native provider resources."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Provisioners when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "resource operation → provisioner connection → command execution. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform fmt -check\nterraform validate\nterraform plan",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Provisioners run scripts on local or remote machines during resource creation or destruction. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Provisioners with a practical DevOps example.",
        "answer": "Provisioners run scripts on local or remote machines during resource creation or destruction. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Provisioners.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/import-existing-resources": {
    "summary": "Terraform import associates an existing remote object with a Terraform resource address so it can be managed as code.",
    "diagram": {
      "title": "Import Existing Resources execution flow",
      "nodes": [
        "existing resource ID",
        "import mapping",
        "state address",
        "matching configuration"
      ],
      "explanation": "existing resource ID → import mapping → state address → matching configuration. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Terraform import associates an existing remote object with a Terraform resource address so it can be managed as code.",
          "Use it when adopting manually created infrastructure without recreating the resource."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Import Existing Resources when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "existing resource ID → import mapping → state address → matching configuration. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform import YOUR_RESOURCE_ADDRESS EXISTING_RESOURCE_ID\nterraform plan",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Terraform import associates an existing remote object with a Terraform resource address so it can be managed as code. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Import Existing Resources with a practical DevOps example.",
        "answer": "Terraform import associates an existing remote object with a Terraform resource address so it can be managed as code. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Import Existing Resources.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/terraform-refresh-and-drift": {
    "summary": "Drift occurs when real infrastructure differs from Terraform configuration or recorded state; planning refreshes observed attributes as part of normal workflows.",
    "diagram": {
      "title": "Terraform Refresh and Drift execution flow",
      "nodes": [
        "configuration + state + provider read",
        "refreshed view",
        "drift-aware plan"
      ],
      "explanation": "configuration + state + provider read → refreshed view → drift-aware plan. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Drift occurs when real infrastructure differs from Terraform configuration or recorded state; planning refreshes observed attributes as part of normal workflows.",
          "Detect drift early so manual changes do not become hidden production configuration."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Terraform Refresh and Drift when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "configuration + state + provider read → refreshed view → drift-aware plan. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform plan -refresh-only\nterraform plan",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Drift occurs when real infrastructure differs from Terraform configuration or recorded state; planning refreshes observed attributes as part of normal workflows. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Terraform Refresh and Drift with a practical DevOps example.",
        "answer": "Drift occurs when real infrastructure differs from Terraform configuration or recorded state; planning refreshes observed attributes as part of normal workflows. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Terraform Refresh and Drift.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/sensitive-values": {
    "summary": "Sensitive marks values for redaction in normal CLI output but does not automatically encrypt or remove them from state.",
    "diagram": {
      "title": "Sensitive Values execution flow",
      "nodes": [
        "sensitive variable/output",
        "redacted display",
        "underlying value still requires secure storage"
      ],
      "explanation": "sensitive variable/output → redacted display → underlying value still requires secure storage. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Sensitive marks values for redaction in normal CLI output but does not automatically encrypt or remove them from state.",
          "Use it to reduce accidental display, while protecting state and logs separately."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Sensitive Values when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "sensitive variable/output → redacted display → underlying value still requires secure storage. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform output\nterraform output -json",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Sensitive marks values for redaction in normal CLI output but does not automatically encrypt or remove them from state. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Sensitive Values with a practical DevOps example.",
        "answer": "Sensitive marks values for redaction in normal CLI output but does not automatically encrypt or remove them from state. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Sensitive Values.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/secrets-handling": {
    "summary": "Terraform secrets handling keeps credentials out of source files and protects state, plans and CI logs.",
    "diagram": {
      "title": "Secrets Handling execution flow",
      "nodes": [
        "secret manager / workload identity",
        "provider auth or sensitive input",
        "controlled Terraform run"
      ],
      "explanation": "secret manager / workload identity → provider auth or sensitive input → controlled Terraform run. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Terraform secrets handling keeps credentials out of source files and protects state, plans and CI logs.",
          "Use secret managers or secure CI variables and short-lived identity wherever possible."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Secrets Handling when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "secret manager / workload identity → provider auth or sensitive input → controlled Terraform run. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform fmt -check\nterraform validate\nterraform plan",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Terraform secrets handling keeps credentials out of source files and protects state, plans and CI logs. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Secrets Handling with a practical DevOps example.",
        "answer": "Terraform secrets handling keeps credentials out of source files and protects state, plans and CI logs. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Secrets Handling.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/terraform-testing": {
    "summary": "Terraform testing validates configuration structure, plans and module behavior before production rollout.",
    "diagram": {
      "title": "Terraform Testing execution flow",
      "nodes": [
        "fmt",
        "init",
        "validate",
        "test/plan",
        "policy checks"
      ],
      "explanation": "fmt → init → validate → test/plan → policy checks. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Terraform testing validates configuration structure, plans and module behavior before production rollout.",
          "Use formatting, validation, static policy checks and test environments to reduce infrastructure defects."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Terraform Testing when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "fmt → init → validate → test/plan → policy checks. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform fmt -check\nterraform init -backend=false\nterraform validate\nterraform test",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Terraform testing validates configuration structure, plans and module behavior before production rollout. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Terraform Testing with a practical DevOps example.",
        "answer": "Terraform testing validates configuration structure, plans and module behavior before production rollout. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Terraform Testing.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/ci-cd-integration": {
    "summary": "Terraform CI/CD automates formatting, validation, planning, approval and applying infrastructure changes.",
    "diagram": {
      "title": "CI/CD Integration execution flow",
      "nodes": [
        "pull request",
        "fmt/validate/plan",
        "review approval",
        "protected apply"
      ],
      "explanation": "pull request → fmt/validate/plan → review approval → protected apply. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Terraform CI/CD automates formatting, validation, planning, approval and applying infrastructure changes.",
          "Use separate plan and apply permissions with artifact integrity and environment protection."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use CI/CD Integration when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "pull request → fmt/validate/plan → review approval → protected apply. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform fmt -check\nterraform validate\nterraform plan",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Terraform CI/CD automates formatting, validation, planning, approval and applying infrastructure changes. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain CI/CD Integration with a practical DevOps example.",
        "answer": "Terraform CI/CD automates formatting, validation, planning, approval and applying infrastructure changes. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate CI/CD Integration.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/terraform-security-and-best-practices": {
    "summary": "Terraform security combines least-privilege cloud identities, protected state, reviewed modules, pinned dependencies and controlled plans.",
    "diagram": {
      "title": "Terraform Security and Best Practices execution flow",
      "nodes": [
        "source review",
        "policy and security checks",
        "protected plan",
        "approval",
        "least-privilege apply"
      ],
      "explanation": "source review → policy and security checks → protected plan → approval → least-privilege apply. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Terraform security combines least-privilege cloud identities, protected state, reviewed modules, pinned dependencies and controlled plans.",
          "Treat plans and state as sensitive operational artifacts and avoid unrestricted production applies."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Terraform Security and Best Practices when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "source review → policy and security checks → protected plan → approval → least-privilege apply. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform fmt -check\nterraform validate\nterraform plan",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Terraform security combines least-privilege cloud identities, protected state, reviewed modules, pinned dependencies and controlled plans. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Terraform Security and Best Practices with a practical DevOps example.",
        "answer": "Terraform security combines least-privilege cloud identities, protected state, reviewed modules, pinned dependencies and controlled plans. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Terraform Security and Best Practices.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  },
  "terraform/troubleshooting-terraform": {
    "summary": "Terraform troubleshooting inspects initialization, provider authentication, configuration validation, dependency graph, state and API error evidence.",
    "diagram": {
      "title": "Troubleshooting Terraform execution flow",
      "nodes": [
        "CLI error",
        "validate config",
        "inspect provider/backend",
        "inspect state/lock",
        "safe remediation"
      ],
      "explanation": "CLI error → validate config → inspect provider/backend → inspect state/lock → safe remediation. Terraform builds a dependency graph and uses provider APIs to reconcile declared configuration with real infrastructure; state records the resource mapping."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Terraform troubleshooting inspects initialization, provider authentication, configuration validation, dependency graph, state and API error evidence.",
          "Diagnose the first failing layer before changing state or using force-unlock."
        ],
        "bullets": [
          "Keep .tf files in version control and review every infrastructure change.",
          "Use consistent provider and module version constraints.",
          "Treat state, plans and credentials as sensitive operational data."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Troubleshooting Terraform when a team needs repeatable, reviewable infrastructure operations across development, staging and production. A practical DevOps flow is a pull request that runs formatting, validation and plan, followed by an approved apply from a protected pipeline.",
          "Separate environments with appropriate accounts, roles and state boundaries; do not assume CLI workspaces alone provide production isolation."
        ],
        "bullets": [
          "Development: experiment in disposable accounts or sandboxes.",
          "CI: run fmt, validate, tests and plan on proposed changes.",
          "Production: use protected approvals, remote state and least-privilege identity."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "CLI error → validate config → inspect provider/backend → inspect state/lock → safe remediation. Terraform parses HCL, resolves modules and providers, evaluates expressions, builds a dependency graph and asks providers to inspect or change remote resources. State connects Terraform resource addresses to real object identities.",
          "A plan is a proposed set of operations, not a guarantee that an apply will succeed; permissions, quotas, API availability and concurrent changes can affect execution."
        ],
        "bullets": [
          "Configuration describes desired infrastructure.",
          "Provider plugins communicate with external platforms.",
          "State tracks resource identity and observed attributes.",
          "Plan previews actions before changes are applied."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands in a lab directory with a test backend and non-production credentials. Review generated plans carefully, especially replacements and deletions. Do not apply or destroy production resources without approval."
        ],
        "code": "terraform version\nterraform fmt -check\nterraform validate\nterraform providers\nterraform state list",
        "note": "Do not commit terraform.tfstate, saved plan files, credentials or secret values to a public repository. Protect remote state with encryption, access control and locking."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use remote state with locking, encryption and backups. Pin provider and module versions, validate inputs, use least-privilege cloud roles and separate plan from apply permissions.",
          "Prefer declarative provider resources over provisioners. Review destructive actions, protect critical resources and test module changes in a non-production environment."
        ],
        "bullets": [
          "Run terraform fmt and validate in CI.",
          "Review plan output and retain approved plan artifacts securely.",
          "Use state locking and never edit state JSON manually.",
          "Use import blocks or terraform import for controlled adoption of existing resources.",
          "Avoid exposing secrets through outputs, logs or state access."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the exact CLI error. Check Terraform version, formatting, validation, provider initialization, backend configuration and authentication. Then inspect dependency references, state addresses, lock ownership and remote API permissions.",
          "Never delete or edit state to silence an error. Back up state and use documented state commands only after confirming the intended mapping and reviewing the plan."
        ],
        "bullets": [
          "Init failure: check backend credentials, provider source and network.",
          "Plan error: inspect HCL syntax, variable values and provider schema.",
          "AccessDenied: verify the active identity and least-privilege permissions.",
          "State lock: confirm no run is active before safe recovery.",
          "Drift: compare refreshed plan with approved configuration and investigate manual changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Terraform troubleshooting inspects initialization, provider authentication, configuration validation, dependency graph, state and API error evidence. In production, I would keep configuration in Git, use a secure remote backend, review plans before apply, use least-privilege credentials and protect state from unauthorized access."
        ],
        "bullets": [
          "Explain configuration, provider, dependency graph and state.",
          "Describe plan versus apply and why approval matters.",
          "Explain drift, locking and safe recovery."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Troubleshooting Terraform with a practical DevOps example.",
        "answer": "Terraform troubleshooting inspects initialization, provider authentication, configuration validation, dependency graph, state and API error evidence. A team can implement this in a version-controlled Terraform workflow, validate and plan changes in CI, review the proposed actions, then apply using a protected role and remote state."
      },
      {
        "question": "How do you troubleshoot a failed Terraform run?",
        "answer": "Capture the exact error, verify Terraform and provider versions, inspect initialization and backend access, validate configuration and credentials, then check dependency graph, state mapping, lock status and provider API permissions. Back up state before any state operation and verify the resulting plan."
      }
    ],
    "handsOn": [
      "Create a disposable Terraform working directory to demonstrate Troubleshooting Terraform.",
      "Run fmt, init and validate; record what each command checks.",
      "Create a small test resource or mock configuration, inspect the plan and identify create/update/replace/destroy actions.",
      "Write a runbook for state protection, approval, failure recovery and cleanup."
    ]
  }
};
