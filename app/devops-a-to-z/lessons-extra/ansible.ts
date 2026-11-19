import type { AtoZLesson } from "../lessons";

export const ansibleAtoZLessons: Record<string, AtoZLesson> = {
  "ansible/ansible-introduction": {
    "summary": "Ansible is an automation and configuration-management tool that uses readable YAML playbooks to configure systems and deploy applications.",
    "diagram": {
      "title": "Ansible Introduction automation flow",
      "nodes": [
        "Ansible CLI",
        "inventory host selection",
        "connection plugin",
        "module execution",
        "task result"
      ],
      "explanation": "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Ansible is an automation and configuration-management tool that uses readable YAML playbooks to configure systems and deploy applications.",
          "This helps DevOps teams automate ansible introduction consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Ansible Introduction when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible --version\nansible-inventory --list -i inventory.ini\nansible all -i inventory.ini -m ping",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Ansible is an automation and configuration-management tool that uses readable YAML playbooks to configure systems and deploy applications. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Ansible Introduction with a practical DevOps example.",
        "answer": "Ansible is an automation and configuration-management tool that uses readable YAML playbooks to configure systems and deploy applications. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Ansible Introduction against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/ansible-architecture": {
    "summary": "Ansible uses a control node that connects to managed nodes, transfers or executes modules, and collects results.",
    "diagram": {
      "title": "Ansible Architecture automation flow",
      "nodes": [
        "Operator",
        "Ansible control node",
        "inventory and playbook",
        "SSH / API connection",
        "managed node or cloud API"
      ],
      "explanation": "Operator → Ansible control node → inventory and playbook → SSH / API connection → managed node or cloud API. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Ansible uses a control node that connects to managed nodes, transfers or executes modules, and collects results.",
          "This helps DevOps teams automate ansible architecture consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Ansible Architecture when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Operator → Ansible control node → inventory and playbook → SSH / API connection → managed node or cloud API. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible --version\nansible-inventory -i inventory.ini --graph\nansible-playbook -i inventory.ini site.yml --check --diff",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Ansible uses a control node that connects to managed nodes, transfers or executes modules, and collects results. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Ansible Architecture with a practical DevOps example.",
        "answer": "Ansible uses a control node that connects to managed nodes, transfers or executes modules, and collects results. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Ansible Architecture against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/control-node-and-managed-nodes": {
    "summary": "The control node runs Ansible commands and playbooks; managed nodes are the systems being configured.",
    "diagram": {
      "title": "Control Node and Managed Nodes automation flow",
      "nodes": [
        "Ansible CLI",
        "inventory host selection",
        "connection plugin",
        "module execution",
        "task result"
      ],
      "explanation": "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "The control node runs Ansible commands and playbooks; managed nodes are the systems being configured.",
          "This helps DevOps teams automate control node and managed nodes consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Control Node and Managed Nodes when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible --version\nansible-inventory -i inventory.ini --graph\nansible-playbook -i inventory.ini site.yml --check --diff",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The control node runs Ansible commands and playbooks; managed nodes are the systems being configured. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Control Node and Managed Nodes with a practical DevOps example.",
        "answer": "The control node runs Ansible commands and playbooks; managed nodes are the systems being configured. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Control Node and Managed Nodes against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/agentless-automation": {
    "summary": "Ansible is agentless for common Linux management and usually connects over SSH rather than requiring a persistent Ansible agent.",
    "diagram": {
      "title": "Agentless Automation automation flow",
      "nodes": [
        "Control node",
        "SSH connection",
        "temporary module execution",
        "managed host result"
      ],
      "explanation": "Control node → SSH connection → temporary module execution → managed host result. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Ansible is agentless for common Linux management and usually connects over SSH rather than requiring a persistent Ansible agent.",
          "This helps DevOps teams automate agentless automation consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Agentless Automation when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Control node → SSH connection → temporary module execution → managed host result. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible --version\nansible-inventory -i inventory.ini --graph\nansible-playbook -i inventory.ini site.yml --check --diff",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Ansible is agentless for common Linux management and usually connects over SSH rather than requiring a persistent Ansible agent. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Agentless Automation with a practical DevOps example.",
        "answer": "Ansible is agentless for common Linux management and usually connects over SSH rather than requiring a persistent Ansible agent. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Agentless Automation against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/installation": {
    "summary": "Ansible installation provides the command-line tools and Python runtime needed to execute playbooks and collections.",
    "diagram": {
      "title": "Installation automation flow",
      "nodes": [
        "Ansible CLI",
        "inventory host selection",
        "connection plugin",
        "module execution",
        "task result"
      ],
      "explanation": "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Ansible installation provides the command-line tools and Python runtime needed to execute playbooks and collections.",
          "This helps DevOps teams automate installation consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Installation when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible --version\nansible-inventory -i inventory.ini --graph\nansible-playbook -i inventory.ini site.yml --check --diff",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Ansible installation provides the command-line tools and Python runtime needed to execute playbooks and collections. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Installation with a practical DevOps example.",
        "answer": "Ansible installation provides the command-line tools and Python runtime needed to execute playbooks and collections. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Installation against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/configuration-file": {
    "summary": "ansible.cfg defines defaults such as inventory location, roles paths, SSH behavior and privilege escalation settings.",
    "diagram": {
      "title": "Configuration File automation flow",
      "nodes": [
        "Ansible CLI",
        "inventory host selection",
        "connection plugin",
        "module execution",
        "task result"
      ],
      "explanation": "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "ansible.cfg defines defaults such as inventory location, roles paths, SSH behavior and privilege escalation settings.",
          "This helps DevOps teams automate configuration file consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Configuration File when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible --version\nansible-config dump --only-changed\nansible-config view",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "ansible.cfg defines defaults such as inventory location, roles paths, SSH behavior and privilege escalation settings. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Configuration File with a practical DevOps example.",
        "answer": "ansible.cfg defines defaults such as inventory location, roles paths, SSH behavior and privilege escalation settings. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Configuration File against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/inventory": {
    "summary": "Inventory defines the hosts and groups Ansible can target and can include connection variables.",
    "diagram": {
      "title": "Inventory automation flow",
      "nodes": [
        "inventory source",
        "host/group selection",
        "variable resolution",
        "task targeting"
      ],
      "explanation": "inventory source → host/group selection → variable resolution → task targeting. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Inventory defines the hosts and groups Ansible can target and can include connection variables.",
          "This helps DevOps teams automate inventory consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Inventory when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "inventory source → host/group selection → variable resolution → task targeting. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible-inventory -i inventory.ini --graph\nansible-inventory -i inventory.ini --list",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Inventory defines the hosts and groups Ansible can target and can include connection variables. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Inventory with a practical DevOps example.",
        "answer": "Inventory defines the hosts and groups Ansible can target and can include connection variables. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Inventory against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/static-inventory": {
    "summary": "Static inventory lists managed hosts and groups in INI or YAML files.",
    "diagram": {
      "title": "Static Inventory automation flow",
      "nodes": [
        "Ansible CLI",
        "inventory host selection",
        "connection plugin",
        "module execution",
        "task result"
      ],
      "explanation": "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Static inventory lists managed hosts and groups in INI or YAML files.",
          "This helps DevOps teams automate static inventory consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Static Inventory when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "cat > inventory.ini <<'EOF'\n[web]\nweb1 ansible_host=192.0.2.10\n[web:vars]\nansible_user=ubuntu\nEOF\nansible-inventory -i inventory.ini --graph",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Static inventory lists managed hosts and groups in INI or YAML files. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Static Inventory with a practical DevOps example.",
        "answer": "Static inventory lists managed hosts and groups in INI or YAML files. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Static Inventory against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/dynamic-inventory": {
    "summary": "Dynamic inventory plugins query cloud or external systems to discover hosts and group metadata at runtime.",
    "diagram": {
      "title": "Dynamic Inventory automation flow",
      "nodes": [
        "cloud API",
        "inventory plugin",
        "discovered hosts/groups",
        "playbook targeting"
      ],
      "explanation": "cloud API → inventory plugin → discovered hosts/groups → playbook targeting. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Dynamic inventory plugins query cloud or external systems to discover hosts and group metadata at runtime.",
          "This helps DevOps teams automate dynamic inventory consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Dynamic Inventory when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "cloud API → inventory plugin → discovered hosts/groups → playbook targeting. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible-inventory -i aws_ec2.yml --graph\nansible-inventory -i aws_ec2.yml --list",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Dynamic inventory plugins query cloud or external systems to discover hosts and group metadata at runtime. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Dynamic Inventory with a practical DevOps example.",
        "answer": "Dynamic inventory plugins query cloud or external systems to discover hosts and group metadata at runtime. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Dynamic Inventory against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/ad-hoc-commands": {
    "summary": "Ad-hoc commands run a single Ansible module against selected inventory hosts without writing a playbook.",
    "diagram": {
      "title": "Ad-hoc Commands automation flow",
      "nodes": [
        "Ansible CLI",
        "inventory host selection",
        "connection plugin",
        "module execution",
        "task result"
      ],
      "explanation": "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Ad-hoc commands run a single Ansible module against selected inventory hosts without writing a playbook.",
          "This helps DevOps teams automate ad-hoc commands consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Ad-hoc Commands when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible all -i inventory.ini -m ping\nansible web -i inventory.ini -m command -a 'uptime'",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Ad-hoc commands run a single Ansible module against selected inventory hosts without writing a playbook. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Ad-hoc Commands with a practical DevOps example.",
        "answer": "Ad-hoc commands run a single Ansible module against selected inventory hosts without writing a playbook. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Ad-hoc Commands against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/modules": {
    "summary": "Modules are task units that perform operations such as package installation, service management, file changes and cloud API calls.",
    "diagram": {
      "title": "Modules automation flow",
      "nodes": [
        "Ansible CLI",
        "inventory host selection",
        "connection plugin",
        "module execution",
        "task result"
      ],
      "explanation": "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Modules are task units that perform operations such as package installation, service management, file changes and cloud API calls.",
          "This helps DevOps teams automate modules consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Modules when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible --version\nansible-inventory -i inventory.ini --graph\nansible-playbook -i inventory.ini site.yml --check --diff",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Modules are task units that perform operations such as package installation, service management, file changes and cloud API calls. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Modules with a practical DevOps example.",
        "answer": "Modules are task units that perform operations such as package installation, service management, file changes and cloud API calls. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Modules against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/playbooks": {
    "summary": "Playbooks are YAML documents that describe ordered automation plays, hosts, variables, tasks and handlers.",
    "diagram": {
      "title": "Playbooks automation flow",
      "nodes": [
        "playbook YAML",
        "play parser",
        "host pattern",
        "ordered tasks",
        "handlers"
      ],
      "explanation": "playbook YAML → play parser → host pattern → ordered tasks → handlers. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Playbooks are YAML documents that describe ordered automation plays, hosts, variables, tasks and handlers.",
          "This helps DevOps teams automate playbooks consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Playbooks when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "playbook YAML → play parser → host pattern → ordered tasks → handlers. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible-playbook -i inventory.ini site.yml --syntax-check\nansible-playbook -i inventory.ini site.yml --check --diff",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Playbooks are YAML documents that describe ordered automation plays, hosts, variables, tasks and handlers. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Playbooks with a practical DevOps example.",
        "answer": "Playbooks are YAML documents that describe ordered automation plays, hosts, variables, tasks and handlers. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Playbooks against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/tasks": {
    "summary": "Tasks are individual automation actions that invoke modules with specific arguments.",
    "diagram": {
      "title": "Tasks automation flow",
      "nodes": [
        "Ansible CLI",
        "inventory host selection",
        "connection plugin",
        "module execution",
        "task result"
      ],
      "explanation": "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Tasks are individual automation actions that invoke modules with specific arguments.",
          "This helps DevOps teams automate tasks consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Tasks when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible-playbook -i inventory.ini site.yml --list-tasks",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Tasks are individual automation actions that invoke modules with specific arguments. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Tasks with a practical DevOps example.",
        "answer": "Tasks are individual automation actions that invoke modules with specific arguments. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Tasks against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/handlers": {
    "summary": "Handlers are tasks triggered by notifications, commonly used to restart or reload a service only when its configuration changes.",
    "diagram": {
      "title": "Handlers automation flow",
      "nodes": [
        "task changes configuration",
        "notify handler",
        "handler runs once at play end"
      ],
      "explanation": "task changes configuration → notify handler → handler runs once at play end. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Handlers are tasks triggered by notifications, commonly used to restart or reload a service only when its configuration changes.",
          "This helps DevOps teams automate handlers consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Handlers when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "task changes configuration → notify handler → handler runs once at play end. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible-playbook -i inventory.ini site.yml --check --diff",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Handlers are tasks triggered by notifications, commonly used to restart or reload a service only when its configuration changes. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Handlers with a practical DevOps example.",
        "answer": "Handlers are tasks triggered by notifications, commonly used to restart or reload a service only when its configuration changes. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Handlers against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/variables": {
    "summary": "Variables parameterize playbooks and roles so the same automation can be reused across environments.",
    "diagram": {
      "title": "Variables automation flow",
      "nodes": [
        "Ansible CLI",
        "inventory host selection",
        "connection plugin",
        "module execution",
        "task result"
      ],
      "explanation": "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Variables parameterize playbooks and roles so the same automation can be reused across environments.",
          "This helps DevOps teams automate variables consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Variables when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible-playbook -i inventory.ini site.yml --list-hosts",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Variables parameterize playbooks and roles so the same automation can be reused across environments. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Variables with a practical DevOps example.",
        "answer": "Variables parameterize playbooks and roles so the same automation can be reused across environments. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Variables against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/facts": {
    "summary": "Facts are system properties gathered from managed nodes and made available to playbooks as variables.",
    "diagram": {
      "title": "Facts automation flow",
      "nodes": [
        "Ansible CLI",
        "inventory host selection",
        "connection plugin",
        "module execution",
        "task result"
      ],
      "explanation": "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Facts are system properties gathered from managed nodes and made available to playbooks as variables.",
          "This helps DevOps teams automate facts consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Facts when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible all -i inventory.ini -m setup -a 'filter=ansible_distribution*'",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Facts are system properties gathered from managed nodes and made available to playbooks as variables. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Facts with a practical DevOps example.",
        "answer": "Facts are system properties gathered from managed nodes and made available to playbooks as variables. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Facts against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/conditionals": {
    "summary": "Conditionals use when expressions to run tasks only when specified conditions are true.",
    "diagram": {
      "title": "Conditionals automation flow",
      "nodes": [
        "Ansible CLI",
        "inventory host selection",
        "connection plugin",
        "module execution",
        "task result"
      ],
      "explanation": "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Conditionals use when expressions to run tasks only when specified conditions are true.",
          "This helps DevOps teams automate conditionals consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Conditionals when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible-playbook -i inventory.ini site.yml --check",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Conditionals use when expressions to run tasks only when specified conditions are true. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Conditionals with a practical DevOps example.",
        "answer": "Conditionals use when expressions to run tasks only when specified conditions are true. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Conditionals against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/loops": {
    "summary": "Loops repeat a task over a list of items, reducing duplicated task definitions.",
    "diagram": {
      "title": "Loops automation flow",
      "nodes": [
        "Ansible CLI",
        "inventory host selection",
        "connection plugin",
        "module execution",
        "task result"
      ],
      "explanation": "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Loops repeat a task over a list of items, reducing duplicated task definitions.",
          "This helps DevOps teams automate loops consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Loops when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible-playbook -i inventory.ini site.yml --check --diff",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Loops repeat a task over a list of items, reducing duplicated task definitions. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Loops with a practical DevOps example.",
        "answer": "Loops repeat a task over a list of items, reducing duplicated task definitions. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Loops against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/templates-and-jinja2": {
    "summary": "Jinja2 templates generate configuration files dynamically from variables and facts.",
    "diagram": {
      "title": "Templates and Jinja2 automation flow",
      "nodes": [
        "Ansible CLI",
        "inventory host selection",
        "connection plugin",
        "module execution",
        "task result"
      ],
      "explanation": "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Jinja2 templates generate configuration files dynamically from variables and facts.",
          "This helps DevOps teams automate templates and jinja2 consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Templates and Jinja2 when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible-playbook -i inventory.ini site.yml --check --diff",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Jinja2 templates generate configuration files dynamically from variables and facts. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Templates and Jinja2 with a practical DevOps example.",
        "answer": "Jinja2 templates generate configuration files dynamically from variables and facts. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Templates and Jinja2 against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/roles": {
    "summary": "Roles organize reusable tasks, handlers, templates, files, variables and defaults into a standard directory structure.",
    "diagram": {
      "title": "Roles automation flow",
      "nodes": [
        "playbook role reference",
        "defaults/vars",
        "tasks",
        "templates/files",
        "handlers"
      ],
      "explanation": "playbook role reference → defaults/vars → tasks → templates/files → handlers. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Roles organize reusable tasks, handlers, templates, files, variables and defaults into a standard directory structure.",
          "This helps DevOps teams automate roles consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Roles when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "playbook role reference → defaults/vars → tasks → templates/files → handlers. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible-galaxy role list\nansible-playbook -i inventory.ini site.yml --list-tasks",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Roles organize reusable tasks, handlers, templates, files, variables and defaults into a standard directory structure. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Roles with a practical DevOps example.",
        "answer": "Roles organize reusable tasks, handlers, templates, files, variables and defaults into a standard directory structure. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Roles against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/ansible-galaxy": {
    "summary": "Ansible Galaxy is a distribution and discovery hub for reusable roles and collections.",
    "diagram": {
      "title": "Ansible Galaxy automation flow",
      "nodes": [
        "Ansible CLI",
        "inventory host selection",
        "connection plugin",
        "module execution",
        "task result"
      ],
      "explanation": "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Ansible Galaxy is a distribution and discovery hub for reusable roles and collections.",
          "This helps DevOps teams automate ansible galaxy consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Ansible Galaxy when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible-galaxy role search nginx\nansible-galaxy collection list",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Ansible Galaxy is a distribution and discovery hub for reusable roles and collections. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Ansible Galaxy with a practical DevOps example.",
        "answer": "Ansible Galaxy is a distribution and discovery hub for reusable roles and collections. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Ansible Galaxy against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/collections": {
    "summary": "Collections package Ansible content such as modules, plugins, roles and documentation under a namespace.",
    "diagram": {
      "title": "Collections automation flow",
      "nodes": [
        "Ansible CLI",
        "inventory host selection",
        "connection plugin",
        "module execution",
        "task result"
      ],
      "explanation": "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Collections package Ansible content such as modules, plugins, roles and documentation under a namespace.",
          "This helps DevOps teams automate collections consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Collections when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible-galaxy collection list\nansible-doc -l | head",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Collections package Ansible content such as modules, plugins, roles and documentation under a namespace. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Collections with a practical DevOps example.",
        "answer": "Collections package Ansible content such as modules, plugins, roles and documentation under a namespace. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Collections against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/vault-and-secrets": {
    "summary": "Ansible Vault encrypts sensitive variables and files so secrets are not stored in plaintext in repositories.",
    "diagram": {
      "title": "Vault and Secrets automation flow",
      "nodes": [
        "encrypted Vault file",
        "vault password source",
        "runtime decryption",
        "task variable"
      ],
      "explanation": "encrypted Vault file → vault password source → runtime decryption → task variable. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Ansible Vault encrypts sensitive variables and files so secrets are not stored in plaintext in repositories.",
          "This helps DevOps teams automate vault and secrets consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Vault and Secrets when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "encrypted Vault file → vault password source → runtime decryption → task variable. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible-vault create group_vars/all/vault.yml\nansible-vault view group_vars/all/vault.yml",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Ansible Vault encrypts sensitive variables and files so secrets are not stored in plaintext in repositories. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Vault and Secrets with a practical DevOps example.",
        "answer": "Ansible Vault encrypts sensitive variables and files so secrets are not stored in plaintext in repositories. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Vault and Secrets against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/privilege-escalation": {
    "summary": "Privilege escalation lets Ansible execute selected tasks as another user, commonly root, using become.",
    "diagram": {
      "title": "Privilege Escalation automation flow",
      "nodes": [
        "SSH login user",
        "become request",
        "sudo / su",
        "privileged task"
      ],
      "explanation": "SSH login user → become request → sudo / su → privileged task. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Privilege escalation lets Ansible execute selected tasks as another user, commonly root, using become.",
          "This helps DevOps teams automate privilege escalation consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Privilege Escalation when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "SSH login user → become request → sudo / su → privileged task. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible all -i inventory.ini -b -m command -a 'id'",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Privilege escalation lets Ansible execute selected tasks as another user, commonly root, using become. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Privilege Escalation with a practical DevOps example.",
        "answer": "Privilege escalation lets Ansible execute selected tasks as another user, commonly root, using become. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Privilege Escalation against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/ssh-connectivity": {
    "summary": "SSH connectivity allows Ansible to authenticate to managed Linux hosts and execute automation remotely.",
    "diagram": {
      "title": "SSH Connectivity automation flow",
      "nodes": [
        "Ansible CLI",
        "inventory host selection",
        "connection plugin",
        "module execution",
        "task result"
      ],
      "explanation": "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "SSH connectivity allows Ansible to authenticate to managed Linux hosts and execute automation remotely.",
          "This helps DevOps teams automate ssh connectivity consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use SSH Connectivity when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible all -i inventory.ini -m ping -vvv\nssh -o BatchMode=yes ubuntu@192.0.2.10 true",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "SSH connectivity allows Ansible to authenticate to managed Linux hosts and execute automation remotely. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain SSH Connectivity with a practical DevOps example.",
        "answer": "SSH connectivity allows Ansible to authenticate to managed Linux hosts and execute automation remotely. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate SSH Connectivity against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/tags": {
    "summary": "Tags let operators select or skip subsets of tasks and plays during execution.",
    "diagram": {
      "title": "Tags automation flow",
      "nodes": [
        "Ansible CLI",
        "inventory host selection",
        "connection plugin",
        "module execution",
        "task result"
      ],
      "explanation": "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Tags let operators select or skip subsets of tasks and plays during execution.",
          "This helps DevOps teams automate tags consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Tags when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible-playbook -i inventory.ini site.yml --list-tags\nansible-playbook -i inventory.ini site.yml --tags configure --check",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Tags let operators select or skip subsets of tasks and plays during execution. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Tags with a practical DevOps example.",
        "answer": "Tags let operators select or skip subsets of tasks and plays during execution. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Tags against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/error-handling": {
    "summary": "Ansible error handling controls task failure behavior and defines recovery or cleanup actions.",
    "diagram": {
      "title": "Error Handling automation flow",
      "nodes": [
        "Ansible CLI",
        "inventory host selection",
        "connection plugin",
        "module execution",
        "task result"
      ],
      "explanation": "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Ansible error handling controls task failure behavior and defines recovery or cleanup actions.",
          "This helps DevOps teams automate error handling consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Error Handling when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible-playbook -i inventory.ini site.yml --syntax-check",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Ansible error handling controls task failure behavior and defines recovery or cleanup actions. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Error Handling with a practical DevOps example.",
        "answer": "Ansible error handling controls task failure behavior and defines recovery or cleanup actions. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Error Handling against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/blocks-and-rescue": {
    "summary": "Blocks group tasks and provide rescue and always sections for structured failure handling.",
    "diagram": {
      "title": "Blocks and Rescue automation flow",
      "nodes": [
        "Ansible CLI",
        "inventory host selection",
        "connection plugin",
        "module execution",
        "task result"
      ],
      "explanation": "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Blocks group tasks and provide rescue and always sections for structured failure handling.",
          "This helps DevOps teams automate blocks and rescue consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Blocks and Rescue when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible-playbook -i inventory.ini site.yml --check",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Blocks group tasks and provide rescue and always sections for structured failure handling. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Blocks and Rescue with a practical DevOps example.",
        "answer": "Blocks group tasks and provide rescue and always sections for structured failure handling. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Blocks and Rescue against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/ansible-with-aws": {
    "summary": "Ansible can automate AWS resources using supported collections and cloud API credentials.",
    "diagram": {
      "title": "Ansible with AWS automation flow",
      "nodes": [
        "Ansible controller",
        "AWS collection",
        "IAM role/credentials",
        "AWS API",
        "resource state"
      ],
      "explanation": "Ansible controller → AWS collection → IAM role/credentials → AWS API → resource state. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Ansible can automate AWS resources using supported collections and cloud API credentials.",
          "This helps DevOps teams automate ansible with aws consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Ansible with AWS when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Ansible controller → AWS collection → IAM role/credentials → AWS API → resource state. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible --version\nansible-inventory -i inventory.ini --graph\nansible-playbook -i inventory.ini site.yml --check --diff",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Ansible can automate AWS resources using supported collections and cloud API credentials. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Ansible with AWS with a practical DevOps example.",
        "answer": "Ansible can automate AWS resources using supported collections and cloud API credentials. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Ansible with AWS against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/ansible-with-docker": {
    "summary": "Ansible can build images, manage containers and configure Docker hosts using supported modules and collections.",
    "diagram": {
      "title": "Ansible with Docker automation flow",
      "nodes": [
        "playbook",
        "Docker modules / SSH",
        "Docker Engine API",
        "image/container state"
      ],
      "explanation": "playbook → Docker modules / SSH → Docker Engine API → image/container state. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Ansible can build images, manage containers and configure Docker hosts using supported modules and collections.",
          "This helps DevOps teams automate ansible with docker consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Ansible with Docker when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "playbook → Docker modules / SSH → Docker Engine API → image/container state. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible --version\nansible-inventory -i inventory.ini --graph\nansible-playbook -i inventory.ini site.yml --check --diff",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Ansible can build images, manage containers and configure Docker hosts using supported modules and collections. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Ansible with Docker with a practical DevOps example.",
        "answer": "Ansible can build images, manage containers and configure Docker hosts using supported modules and collections. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Ansible with Docker against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/ansible-with-kubernetes": {
    "summary": "Ansible can apply Kubernetes resources and automate cluster-adjacent tasks through Kubernetes modules and APIs.",
    "diagram": {
      "title": "Ansible with Kubernetes automation flow",
      "nodes": [
        "playbook",
        "Kubernetes collection",
        "kubeconfig / API auth",
        "Kubernetes API",
        "resource reconciliation"
      ],
      "explanation": "playbook → Kubernetes collection → kubeconfig / API auth → Kubernetes API → resource reconciliation. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Ansible can apply Kubernetes resources and automate cluster-adjacent tasks through Kubernetes modules and APIs.",
          "This helps DevOps teams automate ansible with kubernetes consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Ansible with Kubernetes when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "playbook → Kubernetes collection → kubeconfig / API auth → Kubernetes API → resource reconciliation. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible --version\nansible-inventory -i inventory.ini --graph\nansible-playbook -i inventory.ini site.yml --check --diff",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Ansible can apply Kubernetes resources and automate cluster-adjacent tasks through Kubernetes modules and APIs. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Ansible with Kubernetes with a practical DevOps example.",
        "answer": "Ansible can apply Kubernetes resources and automate cluster-adjacent tasks through Kubernetes modules and APIs. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Ansible with Kubernetes against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  },
  "ansible/troubleshooting-ansible": {
    "summary": "Ansible troubleshooting uses inventory, connection diagnostics, task output, verbosity and module-level evidence to isolate failures.",
    "diagram": {
      "title": "Troubleshooting Ansible automation flow",
      "nodes": [
        "Ansible CLI",
        "inventory host selection",
        "connection plugin",
        "module execution",
        "task result"
      ],
      "explanation": "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible resolves variables and target hosts, connects through the configured transport, executes the task and reports changed/ok/failed status."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Ansible troubleshooting uses inventory, connection diagnostics, task output, verbosity and module-level evidence to isolate failures.",
          "This helps DevOps teams automate troubleshooting ansible consistently rather than relying on undocumented manual steps. Idempotent modules aim to make repeated runs converge on the requested state without unnecessary changes."
        ],
        "bullets": [
          "Prefer purpose-built modules over shell commands when a module exists.",
          "Keep playbooks and inventory in version control.",
          "Separate environment-specific variables and secrets from reusable task logic."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Troubleshooting Ansible when configuring Linux servers, deploying applications, enforcing system settings or coordinating cloud and container operations. A common workflow is to validate a playbook in staging, run a check/diff, then apply it to a limited production group before wider rollout.",
          "Ansible commonly connects to Linux through SSH and can use APIs for cloud and platform automation. Verify collection and module support for the exact target version."
        ],
        "bullets": [
          "Development: automate repeatable workstation or test VM setup.",
          "CI/CD: run syntax checks and controlled playbooks from pipelines.",
          "Production: use inventory groups, approvals, serial rollout and audit logs."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Ansible CLI → inventory host selection → connection plugin → module execution → task result. Ansible reads configuration, loads inventory and variables, selects target hosts, connects using the relevant plugin and executes modules. Results are returned per host and handlers can run when notified.",
          "A successful playbook exit does not guarantee application correctness. Verify service health, ports, logs and application-level behavior after changes."
        ],
        "bullets": [
          "Inventory determines which hosts are targeted.",
          "Modules perform the intended operation and report changed/ok/failed.",
          "Handlers respond to notified changes, commonly by reloading services.",
          "Check mode can preview supported changes but is not a perfect simulation for every module."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run commands against a disposable VM or approved staging hosts. Replace inventory, group and playbook names with your lab values. Start with inventory graph, ping, syntax check and check mode before applying changes."
        ],
        "code": "ansible-inventory -i inventory.ini --graph\nansible all -i inventory.ini -m ping -vvv\nansible-playbook -i inventory.ini site.yml --syntax-check -vvv",
        "note": "Use SSH keys or approved identity mechanisms, protect Vault passwords, and avoid placing secret values directly in shell history or verbose logs."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Design idempotent playbooks, pin collection versions, validate inventory sources and use least-privilege SSH or API credentials. Apply changes in controlled batches and verify service health between batches.",
          "Store secrets in Ansible Vault or an approved external secret manager. Review check-mode limitations and test rollback for changes that affect packages, networking or persistent data."
        ],
        "bullets": [
          "Use roles and collections to organize reusable automation.",
          "Use serial and max_fail_percentage for controlled rollout where appropriate.",
          "Keep privilege escalation scoped to tasks that need it.",
          "Log execution evidence without exposing secrets.",
          "Test playbooks against supported OS and collection versions."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with ansible-inventory --graph and the exact host/task failure. Use ping to separate connection problems from module problems, then increase verbosity carefully. Check SSH authentication, Python interpreter, become permissions, variable precedence and collection availability.",
          "For a failing task, reproduce the operation on one test host and inspect the module documentation and returned message before changing the playbook."
        ],
        "bullets": [
          "UNREACHABLE: check DNS, route, SSH port, key and remote user.",
          "Permission denied: validate become configuration and sudo policy.",
          "Undefined variable: inspect inventory groups and variable precedence.",
          "Module not found: verify collection installation and FQCN.",
          "Unexpected changes: review idempotency and check-mode support."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Ansible troubleshooting uses inventory, connection diagnostics, task output, verbosity and module-level evidence to isolate failures. In a production workflow, I would use version-controlled playbooks, reusable roles, protected secrets, staged rollout and post-change verification."
        ],
        "bullets": [
          "Explain control node, managed nodes and inventory.",
          "Describe idempotency and modules versus shell commands.",
          "Explain how you troubleshoot SSH, variables and privilege escalation."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Troubleshooting Ansible with a practical DevOps example.",
        "answer": "Ansible troubleshooting uses inventory, connection diagnostics, task output, verbosity and module-level evidence to isolate failures. I would implement it with a reviewed playbook, target a limited inventory group, run syntax and check-mode validation, apply in stages, and verify the resulting service state."
      },
      {
        "question": "How do you troubleshoot a failed Ansible playbook?",
        "answer": "Inspect the failed host and task, validate inventory and variables, run the ping module to isolate connectivity, check SSH and become permissions, verify Python and collection versions, and reproduce the module operation on one test host. Avoid hiding errors with ignore_errors unless failure is explicitly handled."
      }
    ],
    "handsOn": [
      "Build a disposable Ansible inventory and demonstrate Troubleshooting Ansible against one test VM.",
      "Run inventory graph, ping and syntax-check commands; save the outputs.",
      "Introduce one safe error such as an incorrect variable or unreachable lab host, diagnose it and correct it.",
      "Document idempotency, secret handling, verification and rollback steps."
    ]
  }
};
