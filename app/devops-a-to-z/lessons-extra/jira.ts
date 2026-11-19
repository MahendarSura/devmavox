import type { AtoZLesson } from "../lessons";

export const jiraAtoZLessons: Record<string, AtoZLesson> = {
  "jira/jira-introduction": {
    "summary": "Jira tracks work items and provides configurable workflows, boards, reports and automation for software teams.",
    "diagram": {
      "title": "Jira Introduction workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Jira tracks work items and provides configurable workflows, boards, reports and automation for software teams.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Jira Introduction when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for Jira Introduction. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For Jira Introduction, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Jira tracks work items and provides configurable workflows, boards, reports and automation for software teams. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Jira Introduction and its role in a DevOps environment.",
        "answer": "Jira tracks work items and provides configurable workflows, boards, reports and automation for software teams. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a Jira Introduction issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate Jira Introduction.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/jira-projects": {
    "summary": "A Jira project groups issues, workflows, permissions and configuration for a product or team.",
    "diagram": {
      "title": "Jira Projects workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A Jira project groups issues, workflows, permissions and configuration for a product or team.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Jira Projects when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for Jira Projects. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For Jira Projects, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A Jira project groups issues, workflows, permissions and configuration for a product or team. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Jira Projects and its role in a DevOps environment.",
        "answer": "A Jira project groups issues, workflows, permissions and configuration for a product or team. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a Jira Projects issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate Jira Projects.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/project-types": {
    "summary": "Jira project types provide different configuration and administration models for team-managed or company-managed work.",
    "diagram": {
      "title": "Project Types workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Jira project types provide different configuration and administration models for team-managed or company-managed work.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Project Types when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for Project Types. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For Project Types, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Jira project types provide different configuration and administration models for team-managed or company-managed work. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Project Types and its role in a DevOps environment.",
        "answer": "Jira project types provide different configuration and administration models for team-managed or company-managed work. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a Project Types issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate Project Types.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/issues-and-issue-types": {
    "summary": "Issues are Jira work records; issue types classify work such as stories, tasks, bugs and epics.",
    "diagram": {
      "title": "Issues and Issue Types workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Issues are Jira work records; issue types classify work such as stories, tasks, bugs and epics.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Issues and Issue Types when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for Issues and Issue Types. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For Issues and Issue Types, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Issues are Jira work records; issue types classify work such as stories, tasks, bugs and epics. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Issues and Issue Types and its role in a DevOps environment.",
        "answer": "Issues are Jira work records; issue types classify work such as stories, tasks, bugs and epics. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a Issues and Issue Types issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate Issues and Issue Types.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/epics": {
    "summary": "Epics group related stories and tasks under a larger body of work or product objective.",
    "diagram": {
      "title": "Epics workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Epics group related stories and tasks under a larger body of work or product objective.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Epics when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for Epics. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For Epics, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Epics group related stories and tasks under a larger body of work or product objective. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Epics and its role in a DevOps environment.",
        "answer": "Epics group related stories and tasks under a larger body of work or product objective. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a Epics issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate Epics.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/stories": {
    "summary": "Stories describe user-facing requirements or outcomes that can be estimated and delivered by a team.",
    "diagram": {
      "title": "Stories workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Stories describe user-facing requirements or outcomes that can be estimated and delivered by a team.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Stories when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for Stories. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For Stories, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Stories describe user-facing requirements or outcomes that can be estimated and delivered by a team. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Stories and its role in a DevOps environment.",
        "answer": "Stories describe user-facing requirements or outcomes that can be estimated and delivered by a team. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a Stories issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate Stories.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/tasks-and-subtasks": {
    "summary": "Tasks represent work to be completed and subtasks break larger issues into smaller actionable units.",
    "diagram": {
      "title": "Tasks and Subtasks workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Tasks represent work to be completed and subtasks break larger issues into smaller actionable units.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Tasks and Subtasks when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for Tasks and Subtasks. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For Tasks and Subtasks, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Tasks represent work to be completed and subtasks break larger issues into smaller actionable units. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Tasks and Subtasks and its role in a DevOps environment.",
        "answer": "Tasks represent work to be completed and subtasks break larger issues into smaller actionable units. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a Tasks and Subtasks issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate Tasks and Subtasks.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/bugs": {
    "summary": "Bugs track defects with reproduction steps, expected behavior, actual behavior, severity and resolution.",
    "diagram": {
      "title": "Bugs workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Bugs track defects with reproduction steps, expected behavior, actual behavior, severity and resolution.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Bugs when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for Bugs. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For Bugs, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Bugs track defects with reproduction steps, expected behavior, actual behavior, severity and resolution. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Bugs and its role in a DevOps environment.",
        "answer": "Bugs track defects with reproduction steps, expected behavior, actual behavior, severity and resolution. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a Bugs issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate Bugs.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/workflows": {
    "summary": "Jira workflows define the statuses and transitions an issue follows from creation to completion.",
    "diagram": {
      "title": "Workflows workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Jira workflows define the statuses and transitions an issue follows from creation to completion.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Workflows when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for Workflows. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For Workflows, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Jira workflows define the statuses and transitions an issue follows from creation to completion. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Workflows and its role in a DevOps environment.",
        "answer": "Jira workflows define the statuses and transitions an issue follows from creation to completion. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a Workflows issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate Workflows.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/workflow-statuses": {
    "summary": "Statuses represent an issue's current state in a Jira workflow.",
    "diagram": {
      "title": "Workflow Statuses workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Statuses represent an issue's current state in a Jira workflow.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Workflow Statuses when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for Workflow Statuses. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For Workflow Statuses, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Statuses represent an issue's current state in a Jira workflow. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Workflow Statuses and its role in a DevOps environment.",
        "answer": "Statuses represent an issue's current state in a Jira workflow. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a Workflow Statuses issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate Workflow Statuses.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/transitions": {
    "summary": "Transitions are controlled actions that move an issue between workflow statuses and can enforce conditions or validators.",
    "diagram": {
      "title": "Transitions workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Transitions are controlled actions that move an issue between workflow statuses and can enforce conditions or validators.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Transitions when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for Transitions. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For Transitions, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Transitions are controlled actions that move an issue between workflow statuses and can enforce conditions or validators. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Transitions and its role in a DevOps environment.",
        "answer": "Transitions are controlled actions that move an issue between workflow statuses and can enforce conditions or validators. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a Transitions issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate Transitions.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/boards": {
    "summary": "Boards visualize issues selected by a filter and organize work through columns and swimlanes.",
    "diagram": {
      "title": "Boards workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Boards visualize issues selected by a filter and organize work through columns and swimlanes.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Boards when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for Boards. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For Boards, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Boards visualize issues selected by a filter and organize work through columns and swimlanes. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Boards and its role in a DevOps environment.",
        "answer": "Boards visualize issues selected by a filter and organize work through columns and swimlanes. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a Boards issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate Boards.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/scrum-boards": {
    "summary": "Scrum boards support backlog refinement, sprint planning and tracking work within time-boxed iterations.",
    "diagram": {
      "title": "Scrum Boards workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Scrum boards support backlog refinement, sprint planning and tracking work within time-boxed iterations.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Scrum Boards when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for Scrum Boards. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For Scrum Boards, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Scrum boards support backlog refinement, sprint planning and tracking work within time-boxed iterations. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Scrum Boards and its role in a DevOps environment.",
        "answer": "Scrum boards support backlog refinement, sprint planning and tracking work within time-boxed iterations. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a Scrum Boards issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate Scrum Boards.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/kanban-boards": {
    "summary": "Kanban boards visualize continuous flow and help teams manage work in progress.",
    "diagram": {
      "title": "Kanban Boards workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Kanban boards visualize continuous flow and help teams manage work in progress.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Kanban Boards when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for Kanban Boards. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For Kanban Boards, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Kanban boards visualize continuous flow and help teams manage work in progress. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Kanban Boards and its role in a DevOps environment.",
        "answer": "Kanban boards visualize continuous flow and help teams manage work in progress. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a Kanban Boards issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate Kanban Boards.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/backlogs": {
    "summary": "Backlogs prioritize and organize upcoming work before it is pulled into active delivery.",
    "diagram": {
      "title": "Backlogs workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Backlogs prioritize and organize upcoming work before it is pulled into active delivery.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Backlogs when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for Backlogs. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For Backlogs, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Backlogs prioritize and organize upcoming work before it is pulled into active delivery. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Backlogs and its role in a DevOps environment.",
        "answer": "Backlogs prioritize and organize upcoming work before it is pulled into active delivery. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a Backlogs issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate Backlogs.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/sprints": {
    "summary": "Sprints are fixed-length iterations with a defined goal and selected work items.",
    "diagram": {
      "title": "Sprints workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Sprints are fixed-length iterations with a defined goal and selected work items.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Sprints when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for Sprints. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For Sprints, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Sprints are fixed-length iterations with a defined goal and selected work items. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Sprints and its role in a DevOps environment.",
        "answer": "Sprints are fixed-length iterations with a defined goal and selected work items. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a Sprints issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate Sprints.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/sprint-planning": {
    "summary": "Sprint planning selects work based on priority and capacity and establishes a sprint goal.",
    "diagram": {
      "title": "Sprint Planning workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Sprint planning selects work based on priority and capacity and establishes a sprint goal.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Sprint Planning when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for Sprint Planning. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For Sprint Planning, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Sprint planning selects work based on priority and capacity and establishes a sprint goal. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Sprint Planning and its role in a DevOps environment.",
        "answer": "Sprint planning selects work based on priority and capacity and establishes a sprint goal. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a Sprint Planning issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate Sprint Planning.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/sprint-reports": {
    "summary": "Sprint reports summarize completed, incomplete and scope-changed work for a sprint.",
    "diagram": {
      "title": "Sprint Reports workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Sprint reports summarize completed, incomplete and scope-changed work for a sprint.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Sprint Reports when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for Sprint Reports. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For Sprint Reports, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Sprint reports summarize completed, incomplete and scope-changed work for a sprint. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Sprint Reports and its role in a DevOps environment.",
        "answer": "Sprint reports summarize completed, incomplete and scope-changed work for a sprint. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a Sprint Reports issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate Sprint Reports.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/burndown-charts": {
    "summary": "Burndown charts compare remaining work against time to show progress toward a sprint goal.",
    "diagram": {
      "title": "Burndown Charts workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Burndown charts compare remaining work against time to show progress toward a sprint goal.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Burndown Charts when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for Burndown Charts. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For Burndown Charts, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Burndown charts compare remaining work against time to show progress toward a sprint goal. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Burndown Charts and its role in a DevOps environment.",
        "answer": "Burndown charts compare remaining work against time to show progress toward a sprint goal. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a Burndown Charts issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate Burndown Charts.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/components": {
    "summary": "Components categorize issues by product area or subsystem and can support ownership assignment.",
    "diagram": {
      "title": "Components workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Components categorize issues by product area or subsystem and can support ownership assignment.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Components when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for Components. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For Components, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Components categorize issues by product area or subsystem and can support ownership assignment. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Components and its role in a DevOps environment.",
        "answer": "Components categorize issues by product area or subsystem and can support ownership assignment. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a Components issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate Components.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/versions-and-releases": {
    "summary": "Versions represent planned or released product milestones and help track issue scope for a release.",
    "diagram": {
      "title": "Versions and Releases workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Versions represent planned or released product milestones and help track issue scope for a release.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Versions and Releases when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for Versions and Releases. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For Versions and Releases, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Versions represent planned or released product milestones and help track issue scope for a release. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Versions and Releases and its role in a DevOps environment.",
        "answer": "Versions represent planned or released product milestones and help track issue scope for a release. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a Versions and Releases issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate Versions and Releases.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/labels-and-filters": {
    "summary": "Labels add flexible tags and saved filters query issues using criteria such as status, assignee or project.",
    "diagram": {
      "title": "Labels and Filters workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Labels add flexible tags and saved filters query issues using criteria such as status, assignee or project.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Labels and Filters when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for Labels and Filters. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For Labels and Filters, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Labels add flexible tags and saved filters query issues using criteria such as status, assignee or project. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Labels and Filters and its role in a DevOps environment.",
        "answer": "Labels add flexible tags and saved filters query issues using criteria such as status, assignee or project. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a Labels and Filters issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate Labels and Filters.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/jql": {
    "summary": "Jira Query Language searches and filters issues using fields, operators and functions.",
    "diagram": {
      "title": "JQL workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Jira Query Language searches and filters issues using fields, operators and functions.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use JQL when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for JQL. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For JQL, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Jira Query Language searches and filters issues using fields, operators and functions. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain JQL and its role in a DevOps environment.",
        "answer": "Jira Query Language searches and filters issues using fields, operators and functions. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a JQL issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate JQL.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/dashboards": {
    "summary": "Dashboards combine gadgets and saved filters to provide role-specific project and delivery visibility.",
    "diagram": {
      "title": "Dashboards workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Dashboards combine gadgets and saved filters to provide role-specific project and delivery visibility.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Dashboards when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for Dashboards. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For Dashboards, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Dashboards combine gadgets and saved filters to provide role-specific project and delivery visibility. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Dashboards and its role in a DevOps environment.",
        "answer": "Dashboards combine gadgets and saved filters to provide role-specific project and delivery visibility. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a Dashboards issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate Dashboards.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/reports": {
    "summary": "Jira reports summarize sprint, version, workload and project progress data.",
    "diagram": {
      "title": "Reports workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Jira reports summarize sprint, version, workload and project progress data.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Reports when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for Reports. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For Reports, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Jira reports summarize sprint, version, workload and project progress data. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Reports and its role in a DevOps environment.",
        "answer": "Jira reports summarize sprint, version, workload and project progress data. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a Reports issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate Reports.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/permissions-and-roles": {
    "summary": "Jira permissions and project roles determine who can browse, create, edit or administer project issues.",
    "diagram": {
      "title": "Permissions and Roles workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Jira permissions and project roles determine who can browse, create, edit or administer project issues.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Permissions and Roles when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for Permissions and Roles. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For Permissions and Roles, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Jira permissions and project roles determine who can browse, create, edit or administer project issues. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Permissions and Roles and its role in a DevOps environment.",
        "answer": "Jira permissions and project roles determine who can browse, create, edit or administer project issues. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a Permissions and Roles issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate Permissions and Roles.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/automation-rules": {
    "summary": "Jira automation rules trigger actions based on events, conditions and branching logic.",
    "diagram": {
      "title": "Automation Rules workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Jira automation rules trigger actions based on events, conditions and branching logic.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Automation Rules when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for Automation Rules. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For Automation Rules, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Jira automation rules trigger actions based on events, conditions and branching logic. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Automation Rules and its role in a DevOps environment.",
        "answer": "Jira automation rules trigger actions based on events, conditions and branching logic. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a Automation Rules issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate Automation Rules.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/github-integration": {
    "summary": "GitHub integration links commits, branches and pull requests to Jira issues for traceability.",
    "diagram": {
      "title": "GitHub Integration workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "GitHub integration links commits, branches and pull requests to Jira issues for traceability.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use GitHub Integration when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for GitHub Integration. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For GitHub Integration, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "GitHub integration links commits, branches and pull requests to Jira issues for traceability. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain GitHub Integration and its role in a DevOps environment.",
        "answer": "GitHub integration links commits, branches and pull requests to Jira issues for traceability. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a GitHub Integration issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate GitHub Integration.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/ci-cd-integration": {
    "summary": "CI/CD integration connects build and deployment events to Jira issues and releases.",
    "diagram": {
      "title": "CI/CD Integration workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "CI/CD integration connects build and deployment events to Jira issues and releases.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use CI/CD Integration when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for CI/CD Integration. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For CI/CD Integration, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "CI/CD integration connects build and deployment events to Jira issues and releases. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain CI/CD Integration and its role in a DevOps environment.",
        "answer": "CI/CD integration connects build and deployment events to Jira issues and releases. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a CI/CD Integration issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate CI/CD Integration.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  },
  "jira/devops-metrics-and-jira": {
    "summary": "Jira DevOps metrics connect work tracking with deployment frequency, lead time, change failure rate and recovery time.",
    "diagram": {
      "title": "DevOps Metrics and Jira workflow",
      "nodes": [
        "Jira issue",
        "workflow and board",
        "sprint/release tracking",
        "report and automation"
      ],
      "explanation": "Jira issue → workflow and board → sprint/release tracking → report and automation. Follow the flow boundary by boundary and collect evidence before changing configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Jira DevOps metrics connect work tracking with deployment frequency, lead time, change failure rate and recovery time.",
          "This concept is important in Jira because it helps teams standardize operations, reduce manual errors and make system behavior easier to review and troubleshoot."
        ],
        "bullets": [
          "Understand the component's responsibility and boundaries.",
          "Keep configuration and operational procedures version controlled where appropriate.",
          "Use measurable outcomes rather than relying only on assumptions."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use DevOps Metrics and Jira when the relevant project, application or infrastructure requirement appears in development, testing, CI/CD or production. A DevOps engineer should know the normal workflow, expected result, dependencies and rollback path.",
          "Before changing production, identify the owner, impact, access requirements and maintenance window if the change is disruptive."
        ],
        "bullets": [
          "Development: reproduce and validate behavior in a lab.",
          "CI/CD: automate repeatable checks and evidence collection.",
          "Production: use change review, monitoring and rollback."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jira issue → workflow and board → sprint/release tracking → report and automation. Each stage has inputs, outputs and failure modes. Verify the previous stage before troubleshooting a later stage.",
          "A successful command or configuration load does not automatically prove user-facing health. Validate the actual service response and relevant metrics or logs."
        ],
        "bullets": [
          "Identify the initiating request or event.",
          "Trace dependencies and configuration at each boundary.",
          "Check authorization and network access.",
          "Verify the final application or operational outcome."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use this example in a disposable lab or approved test environment for DevOps Metrics and Jira. Replace paths, hostnames and identifiers with your environment values. Record expected output and compare it with the actual result."
        ],
        "code": "# Jira UI: create an issue, assign an owner, set priority and move it through the workflow.\n# JQL example: project = DEV AND statusCategory != Done ORDER BY priority DESC",
        "note": "Do not expose credentials, private keys, sensitive customer data or internal endpoints in public logs. Review any command that changes production state before execution."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least privilege, supported versions, clear ownership, monitoring and tested recovery procedures. Keep configuration changes reviewable and automate checks that can safely run on every change.",
          "Document service dependencies, expected behavior and escalation paths so another engineer can operate the system without relying on undocumented knowledge."
        ],
        "bullets": [
          "Apply least-privilege access and secure secret handling.",
          "Monitor availability, errors, latency and resource utilization where relevant.",
          "Back up critical configuration and state.",
          "Test changes in a non-production environment first.",
          "Document rollback and incident ownership."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "For DevOps Metrics and Jira, start by capturing the exact symptom, timestamp, affected component and recent change. Inspect status, logs, configuration and dependency health. Isolate the first failing boundary and change one variable at a time.",
          "After remediation, repeat the original failing test and verify the user-visible outcome. Record the root cause and prevention action."
        ],
        "bullets": [
          "Confirm the target environment and identity.",
          "Check service/process status and recent logs.",
          "Validate configuration syntax and dependency versions.",
          "Test DNS, network and authentication paths where relevant.",
          "Compare against a known-good configuration and verify recovery."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Jira DevOps metrics connect work tracking with deployment frequency, lead time, change failure rate and recovery time. In a real DevOps environment, I would apply it through a controlled workflow, validate it in a test environment, secure access, monitor results and document recovery."
        ],
        "bullets": [
          "Define the concept in simple terms.",
          "Give a practical project example.",
          "Explain one failure mode and how to diagnose it."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain DevOps Metrics and Jira and its role in a DevOps environment.",
        "answer": "Jira DevOps metrics connect work tracking with deployment frequency, lead time, change failure rate and recovery time. It supports a repeatable workflow with clear ownership, controlled configuration, verification and operational monitoring."
      },
      {
        "question": "How would you troubleshoot a DevOps Metrics and Jira issue?",
        "answer": "Capture the exact error and timestamp, confirm the environment, inspect status and logs, validate configuration and dependencies, isolate the first failing boundary, apply a small reversible fix and verify the original symptom is resolved."
      }
    ],
    "handsOn": [
      "Set up a safe lab scenario to demonstrate DevOps Metrics and Jira.",
      "Record the initial state and expected outcome.",
      "Introduce one controlled configuration or dependency failure, collect evidence and restore the working state.",
      "Write a runbook with validation, remediation, rollback and prevention steps."
    ]
  }
};
